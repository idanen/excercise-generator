import { useCallback } from 'react';
import './styles.css';
import { InitForm } from './InitForm';
import { Excercises } from './Excercises';
import { useExcercises } from './useExcercises';

export default function App() {
  const { excercises, generateExcercises, resetResults, checkResults } =
    useExcercises();

  const handleInit = useCallback(
    (event) => {
      event.preventDefault();
      const count = event.target.elements.count.valueAsNumber;
      const limit = event.target.elements.limit.valueAsNumber;
      const operations = [
        ...event.target.querySelectorAll(`input[name='operations']`),
      ]
        .filter((input) => input.checked)
        .map((input) => input.value);
      generateExcercises({ count, limit, operations });
    },
    [generateExcercises]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const actualResults = Object.fromEntries(
        new FormData(event.target).entries()
      );
      checkResults(actualResults);
    },
    [checkResults]
  );

  return (
    <div className='App'>
      {excercises.length ? (
        <Excercises
          excercises={excercises}
          onSubmit={handleSubmit}
          onReset={() => generateExcercises({ count: 0 })}
          onRestart={resetResults}
        />
      ) : (
        <InitForm onInit={handleInit} />
      )}
    </div>
  );
}
