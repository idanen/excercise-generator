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
