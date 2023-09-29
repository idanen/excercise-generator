import { useState, useCallback } from 'react';
import { AllowedOperations } from './consts';
import type { Operation, Operator, Status } from './consts';
import { random, findFactors } from './tools';

const DIVIDERS = Array.from({ length: 10 }, (_, index) =>
  Array.from({ length: 10 }, (_, jindex) => (index + 1) * (jindex + 1))
).flat();

export type Excercise = {
  id: number;
  arg1: number;
  operator: Operation['operator'];
  arg2: number;
  status: Status;
};
type ExcerciseInputs = { limit?: number; index: number };
type ExcerciseResults = Record<string, boolean>;

const ExcerciseForOperation = {
  [AllowedOperations.ADDITION.id]: ({
    limit = 100,
    index,
  }: ExcerciseInputs): Excercise => {
    const arg1 = random(1, limit);
    const arg2 = random(1, limit - arg1);
    return {
      id: index,
      arg1,
      operator: AllowedOperations.ADDITION.operator,
      arg2,
      status: 'Unanswered',
    };
  },
  [AllowedOperations.SUBTRACTION.id]: ({
    limit = 100,
    index,
  }: ExcerciseInputs): Excercise => {
    const arg1 = random(2, limit);
    const arg2 = random(0, arg1);
    return {
      id: index,
      arg1,
      operator: AllowedOperations.SUBTRACTION.operator,
      arg2,
      status: 'Unanswered',
    };
  },
  [AllowedOperations.MULTIPLICATION.id]: ({
    index,
  }: ExcerciseInputs): Excercise => {
    const arg1 = random(1, 10);
    const arg2 = random(1, 10);
    return {
      id: index,
      arg1,
      operator: AllowedOperations.MULTIPLICATION.operator,
      arg2,
      status: 'Unanswered',
    };
  },
  [AllowedOperations.DIVISION.id]: ({ index }: ExcerciseInputs): Excercise => {
    const arg1 = DIVIDERS[random(0, 100)];
    const factors = findFactors(arg1).filter((factor) => factor < 11);
    const arg2 = factors[random(0, factors.length)] || 1;
    return {
      id: index,
      arg1,
      operator: AllowedOperations.DIVISION.operator,
      arg2,
      status: 'Unanswered',
    };
  },
} as const;

type CheckerInputs = { arg1: number; arg2: number };
type ExcersiseKeys = 'right' | 'wrong';

const CheckerForOperation = {
  [AllowedOperations.ADDITION.operator]: ({ arg1, arg2 }: CheckerInputs) =>
    arg1 + arg2,
  [AllowedOperations.SUBTRACTION.operator]: ({ arg1, arg2 }: CheckerInputs) =>
    arg1 - arg2,
  [AllowedOperations.MULTIPLICATION.operator]: ({
    arg1,
    arg2,
  }: CheckerInputs) => arg1 * arg2,
  [AllowedOperations.DIVISION.operator]: ({ arg1, arg2 }: CheckerInputs) =>
    Math.round(arg1 / arg2),
} as const;

export function useExcercises() {
  const [excercises, setExcercises] = useState<Excercise[]>([]);

  const expectedResults = Object.fromEntries(
    excercises.map(({ id, operator, arg1, arg2 }) => [
      id,
      CheckerForOperation[operator]({ arg1, arg2 }),
    ])
  );

  const generateExcercises = useCallback(
    ({
      count,
      limit,
      operations,
    }: {
      count: number;
      limit?: number;
      operations?: (keyof typeof AllowedOperations)[];
    }) => {
      if (!operations?.length) {
        setExcercises([]);
      } else {
        setExcercises(
          Array.from({ length: count }, (_, index) => {
            const operationId = operations[random(0, operations.length)];
            return ExcerciseForOperation[operationId]({ limit, index });
          })
        );
      }
    },
    []
  );

  const checkResults = useCallback(
    (actualResults: Record<string, string>) => {
      const { right, wrong } = Object.entries(actualResults).reduce(
        (acc, [name, result]) => {
          if (typeof result === 'string' && !result.length) {
            return acc;
          }

          const answerId = name.replace('result-', '');
          let field: ExcersiseKeys = 'right';
          if (Number(result) !== expectedResults[answerId]) {
            field = 'wrong';
          }
          acc[field][answerId] = true;

          return acc;
        },
        { right: {}, wrong: {} } as Record<ExcersiseKeys, ExcerciseResults>
      );

      setExcercises((prev) =>
        prev.map((ex) => {
          if (right[ex.id]) {
            return { ...ex, status: 'Correct' };
          }

          if (wrong[ex.id]) {
            return { ...ex, status: 'Incorrect' };
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
        return { ...ex, status: 'Unanswered' };
      })
    );
  }, []);

  return { excercises, generateExcercises, checkResults, resetResults };
}
