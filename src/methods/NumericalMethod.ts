import { ERROR_CONSTANTS } from './constants';
import * as MathUtils from '@Utils/math';

export interface IterationError {
  iterationNumber: number;
  error: string;
}

export interface IterationResult {
  [key: string]: number;
  smallestNumber: number;
  largestNumber: number;
  derivedNumber: number;
  f_smallestNumber: number;
  f_largestNumber: number;
  f_derivedNumber: number;
}

export interface IterationValue extends IterationResult {
  [key: string]: any;
  iterationNumber: number;
}

export type IterationObject = IterationValue | IterationError | IterationResult;

export default class NumericalMethod {
  private _terminatingCondition: keyof typeof MathUtils.mathOperators = 'lte';
  protected terminatingOperation =
    MathUtils.mathOperators[this._terminatingCondition];

  get terminatingCondition() {
    return this._terminatingCondition;
  }

  set terminatingCondition(operator: keyof typeof MathUtils.mathOperators) {
    if (MathUtils.mathOperators[operator]) {
      this._terminatingCondition = operator;
      this.terminatingOperation =
        MathUtils.mathOperators[this._terminatingCondition];
      return;
    }
    this._terminatingCondition = 'lte';
    this.terminatingOperation =
      MathUtils.mathOperators[this._terminatingCondition];
  }

  protected _roundingRules: IterationResult = {
    smallestNumber: 4,
    largestNumber: 4,
    derivedNumber: 4,
    f_smallestNumber: 4,
    f_largestNumber: 4,
    f_derivedNumber: 4,
  };

  get roundingRules() {
    return this._roundingRules;
  }

  set roundingRules(
    value: number | IterationResult | { [key: string]: string | number}
  ) {
    if (!['object', 'number'].includes(typeof value)) {
      return;
    }
    const parsedValue = parseInt(value.toString());
    if (isFinite(parsedValue)) {
      Object.keys(this._roundingRules).map((rrKey) => {
        this._roundingRules[rrKey] = parsedValue;
      });
    } else if (typeof value === 'object') {
      this._roundingRules = Object.assign(this._roundingRules, value);

      Object.keys(this._roundingRules).reduce((acc, rrKey) => {
        const rParsedValue = parseInt(value[rrKey].toString());
        acc[rrKey] = isFinite(rParsedValue)
          ? rParsedValue
          : this._roundingRules[rrKey];
        return acc;
      }, {} as IterationResult);
    }
  }

  terminatingConditionValue: number = 0.0001;
  constructor() {
    this.roundingRules = MathUtils.getSignificantDigits(
      this.terminatingConditionValue
    );
  }

  protected _coefficients: number[] = [];
  protected polynomialFunction: Function = MathUtils.polynomialFuncFactory(
    this._coefficients
  );

  get coefficients() {
    return this._coefficients;
  }

  set coefficients(values: string | number[]) {
    const finalValue = Array.isArray(values) ? values.join(' ') : values;
    if (typeof finalValue === 'string') {
      const _coeffRaw = finalValue
        .split(' ')
        .reverse()
        .map((item) => parseFloat(item));

      //Test for bad values
      const coefficients = _coeffRaw.filter((coeff) => isFinite(coeff));

      if (coefficients.length !== _coeffRaw.length) {
        const errorMes = 'Bad coefficients value';
        this._errorList.push(`${errorMes}: `, coefficients.toString());
        throw new Error(errorMes);
      }

      this._coefficients = coefficients;
      this.polynomialFunction = MathUtils.polynomialFuncFactory(
        this._coefficients
      );
    }
  }

  protected _errorList: string[] = [];

  get errorList() {
    return this._errorList;
  }

  private limitCounter: number = 0;
  limit: number = 100;
  protected formula: Function = () => 0;

  protected derivedNumber: number = 99999;
  protected minSubtractor: number = 0;
  protected maxSubtractor: number = 0;

  protected smallestNumber: number = 0;
  protected largestNumber: number = 0;

  protected rule: Function = (resObj: IterationResult) => {
    this.maxSubtractor = this.largestNumber;
    this.minSubtractor = this.smallestNumber;

    if (resObj.f_derivedNumber > 0) {
      this.maxSubtractor = this.largestNumber;
      this.largestNumber = resObj.derivedNumber;
    } else if (resObj.f_derivedNumber < 0) {
      this.minSubtractor = this.smallestNumber;
      this.smallestNumber = resObj.derivedNumber;
    } else {
      throw new Error('ROOT NUMBER FOUND!');
    }
  };

  protected _iterations: IterationObject[] = [];

  get iterations() {
    return this._iterations;
  }

  initialErrorChecker = () => {
    const errorList = this._errorList;

    if (!this.formula) {
      errorList.push(`Formula missing :: ${this.formula}`);
    }

    if (!this._coefficients.length) {
      errorList.push(`_coefficients is empty :: ${this._coefficients}`);
    }

    if (!isFinite(this.smallestNumber)) {
      errorList.push(
        `Number not finite -> smallestNumber :: ${typeof this.smallestNumber}`
      );
    }
    if (!isFinite(this.largestNumber)) {
      errorList.push(
        `Number not finite -> largestNumber :: ${typeof this.largestNumber}`
      );
    }

    if (this.largestNumber === this.smallestNumber) {
      errorList.push(
        `Largest and Smallest number is the same :: ${this.largestNumber}, ${this.smallestNumber}`
      );
    }

    if (errorList.length) {
      console.error('Errors found', errorList);
      throw new Error('Initial checking failure');
    }
  };

  process = (
    smallestNumber: number | string,
    largestNumber: number | string
  ): void => {
    this._iterations = [];
    this._errorList = [];
    this.smallestNumber = parseFloat(smallestNumber.toString());
    this.largestNumber = parseFloat(largestNumber.toString());

    this.initialErrorChecker();

    const derivedNumberDigits = this._roundingRules['derivedNumber'];
    let _numberParts = this.terminatingConditionValue.toString().split('.');
    let decimalNumbers = _numberParts.length > 1 ? _numberParts[1].length : 0;

    console.log('decimal', decimalNumbers);

    while (
      !this.terminatingOperation(
        MathUtils.round(
          Math.abs(this.derivedNumber - this.minSubtractor),
          decimalNumbers
        ),
        this.terminatingConditionValue
      ) &&
      !this.terminatingOperation(
        MathUtils.round(
          Math.abs(this.derivedNumber - this.maxSubtractor),
          decimalNumbers
        ),
        this.terminatingConditionValue
      ) &&
      this.limitCounter <= this.limit
      /*

      (
        isFinite(this.derivedNumber) &&
        isFinite(this.smallestNumber) &&
        isFinite(this.largestNumber)
      ) &&
      */
    ) {
      console.log(
        this._iterations.length + 1,
        'Comparing values',
        this.derivedNumber,
        this.minSubtractor,
        Math.abs(this.derivedNumber - this.minSubtractor),
        this.maxSubtractor,
        Math.abs(this.derivedNumber - this.maxSubtractor),
        this.terminatingConditionValue,
        this.terminatingCondition
      );
      let derivedNumber = MathUtils.round(
        this.formula(),
        this._roundingRules['derivedNumber']
      );

      if (!isFinite(derivedNumber)) {
        this._iterations.push({
          iterationNumber: this._iterations.length,
          error: ERROR_CONSTANTS.NONFINITE,
        });
        break;
      }

      const smallestNumber = MathUtils.round(
        this.smallestNumber,
        derivedNumberDigits
      );
      const largestNumber = MathUtils.round(
        this.largestNumber,
        derivedNumberDigits
      );

      const resObj: IterationObject = {
        iterationNumber: this._iterations.length + 1,
        derivedNumber,
        smallestNumber,
        largestNumber,
        f_derivedNumber: this.polynomialFunction(derivedNumber),
        f_smallestNumber: this.polynomialFunction(smallestNumber),
        f_largestNumber: this.polynomialFunction(largestNumber),
      };

      console.table(resObj);
      this._iterations.push(resObj);
      this.derivedNumber = derivedNumber;
      this.rule(resObj);
      this.limitCounter++;

      if (this.limitCounter > this.limit) {
        this._iterations.push({
          iterationNumber: this._iterations.length + 1,
          error: ERROR_CONSTANTS.LIMITREACHED,
        });
        break;
      }
    }
  };
}
