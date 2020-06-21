export const ERROR_CONSTANTS = {
  NONFINITE: 'NONFINITE',
  LIMITREACHED: 'LIMITREACHED',
  LASTVALUESMALLER: 'LASTVALUESMALLER',
  FARFROMZERO: 'FARFROMZERO',
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CONSTANTS.NONFINITE]: 'An iteration encountered non-finite values',
  [ERROR_CONSTANTS.LIMITREACHED]: 'Maximum iterations limit has been reached',
  [ERROR_CONSTANTS.LASTVALUESMALLER]:
    'Last value encountered is much closer to 0 than the value in this iteration',
  [ERROR_CONSTANTS.FARFROMZERO]:
    'Last value encountered produces a value very far from 0',
} as const;
