import { useState, useCallback } from 'react';
import { Status, AllowedOperations } from './consts';

const DIVIDERS = Array.from({ length: 10 }, (_, index) =>
  Array.from({ length: 10 }, (_, jindex) => (index + 1) * (jindex + 1))
).flat();

const ExcerciseForOperation = {
  [AllowedOperations.ADDITION.id]: ({ limit, index }) => {
    const arg1 = random(1, limit);
    const arg2 = random(1, limit - arg1);
    return {
      id: index,
      arg1,
      operator: AllowedOperations.ADDITION.operator,
      arg2,
      status: Status.UNANSWERED,
    };
  },
  [AllowedOperations.SUBTRACTION.id]: ({ limit, index }) => {
    const arg1 = random(1, limit);
    const arg2 = random(1, arg1);
    return {
      id: index,
      arg1,
      operator: AllowedOperations.SUBTRACTION.operator,
      arg2,
      status: Status.UNANSWERED,
    };
  },
  [AllowedOperations.MULTIPLICATION.id]: ({ index }) => {
    const arg1 = random(1, 10);
    const arg2 = random(1, 10);
    return {
      id: index,
      arg1,
      operator: AllowedOperations.MULTIPLICATION.operator,
      arg2,
      status: Status.UNANSWERED,
    };
  },
  [AllowedOperations.DIVISION.id]: ({ index }) => {
    const arg1 = DIVIDERS[random(0, 100)];
    const factors = findFactors(arg1).filter((factor) => factor < 11);
    const arg2 = factors[random(0, factors.length)] || 1;
    return {
      id: index,
      arg1,
      operator: AllowedOperations.DIVISION.operator,
      arg2,
      status: Status.UNANSWERED,
    };
  },
};

const CheckerForOperation = {
  [AllowedOperations.ADDITION.operator]: ({ arg1, arg2 }) => arg1 + arg2,
  [AllowedOperations.SUBTRACTION.operator]: ({ arg1, arg2 }) => arg1 - arg2,
  [AllowedOperations.MULTIPLICATION.operator]: ({ arg1, arg2 }) => arg1 * arg2,
  [AllowedOperations.DIVISION.operator]: ({ arg1, arg2 }) =>
    Math.round(arg1 / arg2),
};

export function useExcercises() {
  const [excercises, setExcercises] = useState([]);

  const expectedResults = Object.fromEntries(
    excercises.map(({ id, operator, arg1, arg2 }) => [
      id,
      CheckerForOperation[operator]({ arg1, arg2 }),
    ])
  );

  const generateExcercises = useCallback(({ count, limit, operations }) => {
    setExcercises(
      Array.from({ length: count }, (_, index) => {
        const operationId = operations[random(0, operations.length)];
        return ExcerciseForOperation[operationId]({ limit, index });
      })
    );
  }, []);

  const checkResults = useCallback(
    (actualResults) => {
      const { right, wrong } = Object.entries(actualResults).reduce(
        (acc, [name, result]) => {
          if (typeof result === 'string' && !result.length) {
            return acc;
          }

          const answerId = name.replace('result-', '');
          let field = 'right';
          if (Number(result) !== expectedResults[answerId]) {
            field = 'wrong';
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

  const resetResults = useCallback(() => {
    setExcercises((prev) =>
      prev.map((ex) => {
        return { ...ex, status: Status.UNANSWERED };
      })
    );
  }, []);

  return { excercises, generateExcercises, checkResults, resetResults };
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function findFactors(number) {
  return Array.from({ length: number }, (_, index) => index + 1).filter(
    (iteration) => number % iteration === 0
  );
}
