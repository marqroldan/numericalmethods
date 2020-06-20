export interface ITabulatedValues {
  [key: string]: number;
}

export interface IPossibleRoots {
  positive: number;
  negative: number;
  complex: number;
  zero?: number;
}

export type ICoefficients = number[];
