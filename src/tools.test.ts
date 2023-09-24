import { findFactors } from './tools';

test(`finds all factors of a number`, () => {
  expect(findFactors(36)).toEqual([1, 2, 3, 4, 6, 9, 12, 18, 36]);
});
