export const ERROR_CONSTANTS = {
  NONFINITE: 'NONFINITE',
  LIMITREACHED: 'LIMITREACHED',
  LASTVALUESMALLER: 'LASTVALUESMALLER',
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CONSTANTS.NONFINITE]: 'An iteration encountered non-finite values',
  [ERROR_CONSTANTS.LIMITREACHED]:
    'Limit of maximum iterations has been reached',
  [ERROR_CONSTANTS.LASTVALUESMALLER]:
    'Last value encountered is much closer to 0 than the value in this iteration',
} as const;
