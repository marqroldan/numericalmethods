import * as MathUtils from '@Utils/math';

export interface IterationValue {
  [key: string]: number;
  smallestNumber: number;
  largestNumber: number;
  derivedNumber: number;
  f_smallestNumber: number;
  f_largestNumber: number;
  f_derivedNumber: number;
}

class NumericalMethod {
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

  protected _roundingRules: IterationValue = {
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

  set roundingRules(value: number | IterationValue) {
    if (typeof value === 'number') {
      Object.keys(this._roundingRules).map((rrKey) => {
        this._roundingRules[rrKey] = value;
      });
    } else if (typeof value === 'object') {
      this._roundingRules = Object.assign(this._roundingRules, value);
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

  set coefficients(values: number[]) {
    if (Array.isArray(values)) {
      const finalValues = values.filter((value) => typeof value === 'number');
      if (finalValues.length) {
        this._coefficients = finalValues;
        this.polynomialFunction = MathUtils.polynomialFuncFactory(
          this._coefficients
        );
      }
    }
  }
  
  protected _errorList: string[] = [];

  get errorList() {
    return this._errorList;
  }

  private limitCounter: number = 0;
  limit: number = 100;
  protected formula: Function | undefined;

  protected derivedNumber: number = 99999;
  protected minSubtractor: number = 0;
  protected maxSubtractor: number = 0;

  protected smallestNumber: number = 0;
  protected largestNumber: number = 0;

  protected rule: Function = (resObj: IterationValue) => {
    this.maxSubtractor = this.largestNumber;
    this.minSubtractor = this.smallestNumber;

    if (resObj.f_derivedNumber > 0) {
      this.maxSubtractor = this.largestNumber;
      this.largestNumber = resObj.derivedNumber;
    } else {
      this.minSubtractor = this.smallestNumber;
      this.smallestNumber = resObj.derivedNumber;
    }
  };

  protected _iterations: IterationValue[] = [];

  get iterations() {
    return this._iterations;
  }

  process = (smallestNumber: number, largestNumber: number): void => {
    this._iterations = [];
    this._errorList = [];
    this.smallestNumber = smallestNumber;
    this.largestNumber = largestNumber;

    if (
      !this.formula ||
      !this._coefficients.length ||
      typeof this.smallestNumber !== 'number' ||
      typeof this.largestNumber !== 'number' ||
      this.largestNumber === this.smallestNumber
    ) {
      throw new Error('Values missing.');
    }

    const derivedNumberDigits = this._roundingRules['derivedNumber'];

    while ((
      !this.terminatingOperation(
        parseFloat(
          Math.abs(
            this.derivedNumber -
              parseFloat(this.minSubtractor.toPrecision(derivedNumberDigits))
          ).toFixed(derivedNumberDigits)
        ),
        this.terminatingConditionValue
      ) &&
      !this.terminatingOperation(
        parseFloat(
          Math.abs(
            this.derivedNumber -
              parseFloat(this.maxSubtractor.toPrecision(derivedNumberDigits))
          ).toFixed(derivedNumberDigits)
        ),
        this.terminatingConditionValue
      )) &&
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
      let derivedNumber = parseFloat(
        this.formula().toPrecision(derivedNumberDigits)
      );

      if (!isFinite(derivedNumber)) {
        this._errorList.push(`Derived number is non-finite at ${this._iterations.length + 1}`);
        break;
      }

      const resObj: IterationValue = {
        derivedNumber,
        smallestNumber: parseFloat(
          this.smallestNumber.toPrecision(derivedNumberDigits)
        ),
        largestNumber: parseFloat(
          this.largestNumber.toPrecision(derivedNumberDigits)
        ),
        f_derivedNumber: this.polynomialFunction(derivedNumber),
        f_smallestNumber: this.polynomialFunction(this.smallestNumber),
        f_largestNumber: this.polynomialFunction(this.largestNumber),
      };
      console.table(resObj);
      this._iterations.push(resObj);
      this.derivedNumber = derivedNumber;
      this.rule(resObj);
      this.limitCounter++;
    }

    if(this._errorList.length) {
      console.error(this._errorList);
    }
    console.log('Iterations: ', this._iterations.length);
  };
}

export default NumericalMethod;