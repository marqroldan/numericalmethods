import { ERROR_CONSTANTS } from './constants';
import * as MathUtils from '@Utils/math';

export interface IterationError {
  iterationNumber: number;
  error: keyof typeof ERROR_CONSTANTS;
}

export interface AbsoluteErrors {
  smallest: number;
  largest: number;
  fromZero: number;
}

export type IterationTrack = 'left' | 'center' | 'right';
export interface IterationResult {
  [key: string]: any;
  track: IterationTrack;
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
  decimalNumbers: number;
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

  decimalTCValue = 4;

  private _terminatingConditionValueString: string = '0.0001';
  private _terminatingConditionValue: number = 0.0001;

  get terminatingConditionValue() {
    return this._terminatingConditionValue;
  }

  set terminatingConditionValue(value: number | string) {
    if (value != null) {
      let parsedValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isFinite(parsedValue)) {
        if (typeof value === 'string') {
          this._terminatingConditionValueString = value;
          this.decimalTCValue = MathUtils.getDecimalPlaces(value);
        } else {
          console.warn(
            'Converting numbers to string might have notations (e^-x)'
          );
          this._terminatingConditionValueString = value.toString();
          this.decimalTCValue = MathUtils.getDecimalPlaces(value.toString());
        }
        this._terminatingConditionValue = parsedValue;
        return;
      }
    }
    const errMes = `Bad value for terminating condition value: ${value}`;
    this._errorList.push(errMes);
    throw new Error(errMes);
  }

  constructor() {
    this.roundingRules = MathUtils.getDecimalPlaces(
      this._terminatingConditionValueString
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
      const coefficients = MathUtils.coefficientsFactory(finalValue);

      this._coefficients = coefficients.reverse();
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

  protected minSubtractor: number = 0;
  protected maxSubtractor: number = 0;

  protected smallestNumber: number = 0;
  protected largestNumber: number = 0;

  private track: IterationTrack = 'center';
  private changeTracker: Function = (
    resObj: IterationResult
  ): IterationTrack => {
    if (resObj.f_derivedNumber > 0) {
      this.track = 'right';
    } else if (resObj.f_derivedNumber < 0) {
      this.track = 'left';
    } else {
      this.track = 'center';
    }
    return this.track;
  };

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

  errorValuesGenerator = (derivedNumber: number): AbsoluteErrors => {
    return {
      largest: Math.abs(derivedNumber - this.maxSubtractor),
      smallest: Math.abs(derivedNumber - this.minSubtractor),
      fromZero: Math.abs(0 - this.polynomialFunction(derivedNumber)),
    };
  };

  errorValues: AbsoluteErrors = this.errorValuesGenerator(9999);

  protected _iterations: IterationObject[] = [];

  get iterations() {
    return this._iterations;
  }

  get settings(): MethodSettings {
    return {
      ...this._roundingRules,
      terminatingCondition: this._terminatingCondition,
      terminatingConditionValue: this._terminatingConditionValue,
      decimalNumbers: this.decimalTCValue,
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

    this.errorValues = this.errorValuesGenerator(9999);

    let testLMR = () =>
      !this.terminatingOperation(
        MathUtils.round(this.errorValues.largest, this.decimalTCValue),
        this._terminatingConditionValue
      ) &&
      !this.terminatingOperation(
        MathUtils.round(this.errorValues.smallest, this.decimalTCValue),
        this._terminatingConditionValue
      ) &&
      this.errorValues.fromZero != 0;

    while (testLMR() && this.limitCounter <= this.limit) {
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
        track: this.track,
        errorValues: this.errorValues,
        iterationNumber: this._iterations.length + 1,
        derivedNumber,
        smallestNumber,
        largestNumber,
        f_derivedNumber: this.polynomialFunction(derivedNumber),
        f_smallestNumber: this.polynomialFunction(smallestNumber),
        f_largestNumber: this.polynomialFunction(largestNumber),
      };

      this.rule(resObj);
      this.changeTracker(resObj);

      const lastErrorValue: AbsoluteErrors = this.errorValues;
      this.errorValues = this.errorValuesGenerator(derivedNumber);
      resObj.errorValues = this.errorValues;

      if (!testLMR()) {
        if (resObj.f_derivedNumber > 1) {
          this._iterations.push({
            ...resObj,
            error: ERROR_CONSTANTS.FARFROMZERO,
          });
          break;
        } else if (lastErrorValue.fromZero < this.errorValues.fromZero) {
          this._iterations.push({
            ...resObj,
            error: ERROR_CONSTANTS.LASTVALUESMALLER,
          });
          break;
        }
      }

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
