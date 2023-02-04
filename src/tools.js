import { AllowedOperations } from './consts';
export function findFactors(number) {
  return Array.from({ length: number }, (_, index) => index + 1).filter(
    (iteration) => number % iteration === 0
  );
}

export function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const OperatorToFormatter = {
  [AllowedOperations.ADDITION.operator]: ({ arg1, arg2 }) =>
    `תוצאת ${arg1} ועוד ${arg2}`,
  [AllowedOperations.SUBTRACTION.operator]: ({ arg1, arg2 }) =>
    `תוצאת ${arg1} פחות ${arg2}`,
  [AllowedOperations.MULTIPLICATION.operator]: ({ arg1, arg2 }) =>
    `תוצאת ${arg1} כפול ${arg2}`,
  [AllowedOperations.DIVISION.operator]: ({ arg1, arg2 }) =>
    `תוצאת ${arg1} חלקי ${arg2}`,
};
export function formatExcercise({ arg1, arg2, operator }) {
  return OperatorToFormatter[operator]?.({ arg1, arg2 }) || '';
}
