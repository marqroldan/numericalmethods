import * as MathInterfaces from './interfaces';

export const polynomialFuncFactory = (
  coefficients: MathInterfaces.ICoefficients
) => (xValue: number) => {
  return coefficients.reduce((acc: number, value, index) => {
    return acc + value * Math.pow(xValue, index);
  }, 0);
};

export const mathOperators = {
  lt: (a: number, b: number) => a < b,
  lte: (a: number, b: number) => a <= b,
  gt: (a: number, b: number) => a > b,
  gte: (a: number, b: number) => a >= b,
};

export const mathOperatorsArr = [
  {
    label: '<',
    value: 'lt',
  },
  {
    label: '<=',
    value: 'lte',
  },
  /*
  {
    label: '>',
    value: 'gt',
  },
  {
    label: '>=',
    value: 'gte',
  },
  */
];

export const getSignificantDigits = (value: number) => {
  const actualSignificantDigit = value.toString().replace(/^0\.?0*|\./, '') // remove decimal point and leading zeros
    .length;
  const numberOfDecimalPlaces = value.toString().split('.').pop()?.length;
  return actualSignificantDigit + numberOfDecimalPlaces;
};

export const round = (value: number | string, dp = 0) => {
  const scaler = parseFloat('1' + '0'.repeat(dp));
  return Math.round((parseFloat(value) + Number.EPSILON) * scaler) / scaler;
};

export const coefficientsFactory = (
  value: string
): MathInterfaces.ICoefficients => {
  return value
    .toString()
    .trim()
    .split(' ')
    .reduce<number[]>((acc, val) => {
      if (val != null) {
        const parsedVal = parseFloat(val);
        if (isFinite(parsedVal)) {
          acc.push(parsedVal);
        }
      }
      return acc;
    }, []);
};

export const countPossibleRoots = (
  coefficients: MathInterfaces.ICoefficients
): MathInterfaces.IPossibleRoots => {
  const forPositiveIteration = coefficients.filter(
    (coefficient) => coefficient != 0
  );

  console.log('coefficients huh', coefficients);
  const possiblePositive = forPositiveIteration.reduce((acc, val, index) => {
    if (index !== 0) {
      const lastSign = coefficients[index - 1] > 0;
      const currentSign = val > 0;

      console.log('comparing values', coefficients[index - 1], val);

      if (lastSign != currentSign) {
        acc = acc + 1;
      }
    }
    return acc;
  }, 0);

  console.log('Number of positive', possiblePositive);
  console.log('-----------');

  const forNegativeIteration = coefficients.filter(
    (coefficient) => coefficient != 0
  );

  const possibleNegative = forNegativeIteration
    .reverse()
    .reduce((acc, val, index) => {
      if (index !== 0) {
        const multiplier = coefficients.length - (index + 1);

        const lastSign = coefficients[index - 1] * (-1 ^ (multiplier - 1)) > 0;
        const currentSign = val * (-1 ^ multiplier) > 0;

        console.log('comparing values', coefficients[index - 1], val);

        if (lastSign != currentSign) {
          acc = acc + 1;
        }
      }
      return acc;
    }, 0);

  console.log('Number of positive', possibleNegative);

  /*

  return coefficients.reduce((acc, value, index) => {
    if ((index !== 0 || index !== coefficients.length - 1) && value !== 0) {
      acc.positive += Number(value > 0);
      acc.negative += 0;
      acc.complex += 0;
    }
    return acc;
  }, {} as MathInterfaces.IPossibleRoots);
  */
};
