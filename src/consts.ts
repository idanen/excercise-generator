export const Status = {
  CORRECT: 'Correct',
  INCORRECT: 'Incorrect',
  UNANSWERED: 'Unanswered',
} as const;
export type Status = (typeof Status)[keyof typeof Status];
export type StatusStyle = 'correct' | 'incorrect' | 'unanswered';

export type Operator = '+' | '-' | '×' | '÷';
export const AllowedOperations = {
  ADDITION: { id: 'ADDITION', operator: '+', label: 'חיבור' },
  SUBTRACTION: { id: 'SUBTRACTION', operator: '-', label: 'חיסור' },
  MULTIPLICATION: { id: 'MULTIPLICATION', operator: '×', label: 'כפל' },
  DIVISION: { id: 'DIVISION', operator: '÷', label: 'חילוק' },
} as const;
export type Operation = {
  id: keyof typeof AllowedOperations;
  operator: Operator;
  label: string;
};
