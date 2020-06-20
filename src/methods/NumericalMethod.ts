import { ERROR_CONSTANTS } from './constants';
import * as MathUtils from '@Utils/math';

export interface IterationError {
  iterationNumber: number;
  error: string;
}

export interface AbsoluteErrors {
  smallest: number;
  largest: number;
}

export interface IterationResult {
  [key: string]: any;
  errorValues: AbsoluteErrors;
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

export interface TerminatingConditions {
  [key: string]: any;
  terminatingCondition: keyof typeof MathUtils.mathOperators;
  terminatingConditionValue: number;
}

export type MethodSettings =
  | TerminatingConditions
  | Omit<IterationResult, 'errorValues'>;

export type IterationObject = IterationValue | IterationError | IterationResult;

export default class NumericalMethod {
  protected _errorList: string[] = [];
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

  protected _roundingRules: Omit<IterationResult, 'errorValues'> = {
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
    value: number | IterationResult | { [key: string]: string | number }
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
        acc[rrKey] =
          value[rrKey] != null
            ? parseInt(value[rrKey].toString())
            : this._roundingRules[rrKey];
        return acc;
      }, {} as IterationResult);
    }
  }

  private _terminatingConditionValue: number = 0.0001;

  get terminatingConditionValue() {
    return this._terminatingConditionValue;
  }

  set terminatingConditionValue(value: number | string) {
    if (value != null) {
      const parsedValue = parseFloat(value.toString());
      if (isFinite(parsedValue)) {
        this._terminatingConditionValue = parsedValue;
        return;
      }
    }
    const errMes = `Bad value for terminating condition value: ${value}`;
    this._errorList.push(errMes);
    throw new Error(errMes);
  }

  constructor() {
    this.roundingRules = MathUtils.getSignificantDigits(
      this._terminatingConditionValue
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

  errorValuesGenerator = (): AbsoluteErrors => {
    console.log('dammit', this.derivedNumber, this.maxSubtractor);
    return {
      largest: Math.abs(this.derivedNumber - this.maxSubtractor),
      smallest: Math.abs(this.derivedNumber - this.minSubtractor),
    };
  };

  errorValues: AbsoluteErrors = this.errorValuesGenerator();

  protected _iterations: IterationObject[] = [];

  get iterations() {
    return this._iterations;
  }

  get settings(): MethodSettings {
    return {
      ...this._roundingRules,
      terminatingCondition: this._terminatingCondition,
      terminatingConditionValue: this._terminatingConditionValue,
    };
  }

  set settings(val: MethodSettings) {
    return;
  }

  initialErrorChecker = (smallN: number | string, largeN: number | string) => {
    const errorList = this._errorList;

    if (!this.formula) {
      errorList.push(`Formula missing :: ${this.formula}`);
    }

    if (!this._coefficients.length) {
      errorList.push(`_coefficients is empty :: ${this._coefficients}`);
    }

    if (smallN == null || !isFinite(parseFloat(smallN.toString()))) {
      errorList.push(
        `Value not finite -> smallestNumber :: ${typeof smallN} => ${smallN}`
      );
    }
    if (largeN == null || !isFinite(parseFloat(largeN.toString()))) {
      errorList.push(
        `Value not finite -> largestNumber :: ${typeof largeN} => ${largeN}`
      );
    }

    if (largeN === smallN) {
      errorList.push(
        `Largest and Smallest number is the same :: ${smallN}, ${largeN}`
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
    this.initialErrorChecker(smallestNumber, largestNumber);
    this._iterations = [];

    this.smallestNumber = parseFloat(smallestNumber.toString());
    this.largestNumber = parseFloat(largestNumber.toString());

    let _numberParts = this._terminatingConditionValue.toString().split('.');
    let decimalNumbers = _numberParts.length > 1 ? _numberParts[1].length : 0;

    console.log('decimal', decimalNumbers);

    while (
      !this.terminatingOperation(
        MathUtils.round(this.errorValues.largest, decimalNumbers),
        this._terminatingConditionValue
      ) &&
      !this.terminatingOperation(
        MathUtils.round(this.errorValues.smallest, decimalNumbers),
        this._terminatingConditionValue
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
        this._terminatingConditionValue,
        this.terminatingCondition
      );
      let derivedNumber = MathUtils.round(
        this.formula(),
        this._roundingRules.derivedNumber
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
        this._roundingRules.smallestNumber
      );
      const largestNumber = MathUtils.round(
        this.largestNumber,
        this._roundingRules.largestNumber
      );

      const resObj: IterationObject = {
        errorValues: this.errorValues,
        iterationNumber: this._iterations.length + 1,
        derivedNumber,
        smallestNumber,
        largestNumber,
        f_derivedNumber: this.polynomialFunction(derivedNumber),
        f_smallestNumber: this.polynomialFunction(smallestNumber),
        f_largestNumber: this.polynomialFunction(largestNumber),
      };

      console.table(resObj);
      this.derivedNumber = derivedNumber;
      this.rule(resObj);
      this.errorValues = this.errorValuesGenerator();
      resObj.errorValues = this.errorValues;
      this._iterations.push(resObj);
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
