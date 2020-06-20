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
} as { [key: string]: Function };

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

export const evenReducer = (value: number) => {
  const values = [];
  let startValue = value;
  while (startValue >= 0) {
    values.push(startValue);
    startValue = startValue - 2;
  }
  return values;
};

export const maxPossibleCounter = (arr: number[]) => {
  console.log('Evaluating: ', arr);
  return arr.reduce(
    (acc, val, index) =>
      index !== 0 ? (arr[index - 1] > 0 != val > 0 ? acc + 1 : acc) : acc,
    0
  );
};

export const zeroReducer = (coefficients: MathInterfaces.ICoefficients) => {
  let zeroes = 0;
  let filteredCoefficients = coefficients.slice();

  while (filteredCoefficients[filteredCoefficients.length - 1] == 0) {
    zeroes = zeroes + 1;
    filteredCoefficients.pop();
  }

  return {
    zeroes,
    filteredCoefficients,
  };
};

export const countPossibleRoots = (
  coeff: MathInterfaces.ICoefficients
): MathInterfaces.IPossibleRoots[] => {
  console.log('==============================================');
  console.log('Assessing coefficients: ', coeff);
  const { zeroes, filteredCoefficients } = zeroReducer(coeff);

  const totalPossibleRoots = filteredCoefficients.length - 1;
  console.log('Total possible roots', totalPossibleRoots);

  const forPositiveIteration = filteredCoefficients.filter(
    (coefficient) => coefficient != 0
  );
  const maxPossiblePositive = maxPossibleCounter(forPositiveIteration);
  const possiblePositive = evenReducer(maxPossiblePositive);

  const forNegativeIteration = filteredCoefficients
    .map(
      (coefficient, index) =>
        coefficient * Math.pow(-1, filteredCoefficients.length - index - 1)
    )
    .filter((coefficient) => coefficient != 0);
  const maxPossibleNegative = maxPossibleCounter(forNegativeIteration);
  const possibleNegative = evenReducer(maxPossibleNegative);

  const possibleComplex = evenReducer(
    totalPossibleRoots % 2 ? totalPossibleRoots - 1 : totalPossibleRoots
  );
  console.log('!!!!!!!!!!!!!!!!!');
  console.log('Number of positive', maxPossiblePositive, possiblePositive);
  console.log('Number of negative', maxPossibleNegative, possibleNegative);
  console.log('Number of complex roots', possibleComplex);

  const possibleCombinations: MathInterfaces.IPossibleRoots[] = [];
  const initialPossibleRoots = { zero: zeroes };

  possibleComplex.map((cNum) => {
    possibleNegative.map((nNum) => {
      possiblePositive.map((pNum) => {
        if (cNum + nNum + pNum === totalPossibleRoots) {
          possibleCombinations.push({
            ...initialPossibleRoots,
            complex: cNum,
            negative: nNum,
            positive: pNum,
          } as MathInterfaces.IPossibleRoots);
        }
      });
    });
  });

  console.log('Possible combinations of roots', possibleCombinations);
  console.log('==============================================');
  return possibleCombinations;
};
