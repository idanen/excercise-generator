import { useCallback } from "react";
import "./styles.css";
import { InitForm } from "./InitForm";
import { Excercises } from "./Excercises";
import { useExcercises } from "./useExcercises";

export default function App() {
  const { excercises, generateExcercises, checkResults } = useExcercises();

  const handleInit = useCallback(
    (event) => {
      event.preventDefault();
      const count = event.target.elements.count.valueAsNumber;
      const limit = event.target.elements.limit.valueAsNumber;
      generateExcercises({ count, limit });
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
    <div className="App">
      {excercises.length ? (
        <Excercises
          excercises={excercises}
          onSubmit={handleSubmit}
          onReset={() => generateExcercises({ count: 0 })}
        />
      ) : (
        <InitForm onInit={handleInit} />
      )}
    </div>
  );
}
