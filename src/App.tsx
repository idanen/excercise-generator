import { useCallback } from 'react';
import type { SyntheticEvent } from 'react';
import './styles.css';
import { AllowedOperations } from './consts';
import { InitForm } from './InitForm';
import { Excercises } from './Excercises';
import { useExcercises } from './useExcercises';

export default function App() {
  const { excercises, generateExcercises, resetResults, checkResults } =
    useExcercises();

  const handleInit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const { count, limit } = Object.fromEntries(new FormData(form).entries());
      const operations = [...form.querySelectorAll(`input[name='operations']`)]
        .filter((input) => (input as HTMLInputElement).checked)
        .map(
          (input) => (input as HTMLInputElement).value
        ) as (keyof typeof AllowedOperations)[];
      generateExcercises({
        count: Number(count),
        limit: Number(limit || 100),
        operations,
      });
    },
    [generateExcercises]
  );

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      const actualResults = Object.fromEntries(
        new FormData(event.target as HTMLFormElement).entries()
      );
      checkResults(actualResults as Record<string, string>);
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
