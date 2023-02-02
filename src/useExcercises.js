import { useState, useCallback } from "react";

export const Status = {
  CORRECT: "Correct",
  INCORRECT: "Incorrect",
  UNANSWERED: "Unanswered"
};

export function useExcercises() {
  const [excercises, setExcercises] = useState([]);

  const expectedResults = Object.fromEntries(
    excercises.map(({ id, arg1, arg2 }) => [id, arg1 + arg2])
  );

  const generateExcercises = useCallback(({ count, limit }) => {
    setExcercises(
      Array.from({ length: count }, (_, index) => {
        const arg1 = random(1, limit);
        const arg2 = random(1, limit - arg1);
        return { id: index, arg1, arg2, status: Status.UNANSWERED };
      })
    );
  }, []);

  const checkResults = useCallback(
    (actualResults) => {
      const { right, wrong } = Object.entries(actualResults).reduce(
        (acc, [name, result]) => {
          if (typeof result === "string" && !result.length) {
            return acc;
          }

          const answerId = name.replace("result-", "");
          let field = "right";
          if (Number(result) !== expectedResults[answerId]) {
            field = "wrong";
          }
          acc[field][answerId] = true;

          return acc;
        },
        { right: {}, wrong: {} }
      );

      setExcercises((prev) =>
        prev.map((ex) => {
          if (right[ex.id]) {
            return { ...ex, status: Status.CORRECT };
          }

          if (wrong[ex.id]) {
            return { ...ex, status: Status.INCORRECT };
          }

          return ex;
        })
      );
    },
    [expectedResults]
  );

  return { excercises, generateExcercises, checkResults };
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
