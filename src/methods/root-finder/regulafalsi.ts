import NumericalMethod, { IterationValue } from '../NumericalMethod';

export default class RegulaFalsi extends NumericalMethod {
  constructor() {
    super();
    this.rule = (resObj: IterationValue) => {
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
    this.formula = () => {
      return (
        this.smallestNumber -
        this.polynomialFunction(this.smallestNumber) *
          ((this.smallestNumber - this.largestNumber) /
            (this.polynomialFunction(this.smallestNumber) -
              this.polynomialFunction(this.largestNumber)))
      );
    };
  }
}

/*

function(coefficients: MathInterfaces.ICoefficients, smallestNumber: number, largestNumber: number, terminatingConditionValue: number, terminatingCondition: keyof typeof MathUtils.mathOperators = 'lte') {
    const mFunc = MathUtils.polynomialFuncFactory(coefficients);

    const iterativeFormula = (xNegNumber: number = smallestNumber, xPosNumber: number = largestNumber) => {
        return xNegNumber - (mFunc(xNegNumber) * ((xNegNumber - xPosNumber)/(mFunc(xNegNumber) - mFunc(xPosNumber))));
    }

    const tOperation = MathUtils.mathOperators[terminatingCondition];
    if (!tOperation) {
        return {
            error: 'bad operator',
        }
    }

    let resValue = 9999;
    const result: any = [];
    let xLNumber = smallestNumber;
    let xRNumber = largestNumber;

    let subtractor = 0;
    const decimalPlaces: number = terminatingConditionValue.toString().split('.').pop().length || 4;
    const significantDigits = MathUtils.getSignificantDigits(terminatingConditionValue);

    console.log("Significant Digits", significantDigits);

    while (!tOperation(parseFloat(Math.abs(resValue - subtractor).toFixed(decimalPlaces)), terminatingConditionValue)) {
        console.log(resValue.toPrecision(decimalPlaces));
        let xtValue = parseFloat(iterativeFormula(xLNumber, xRNumber).toPrecision(significantDigits));
        const currRes = {
            xtValue,
            xLNumber,
            xRNumber,
            fxTValue: parseFloat(mFunc(xtValue).toPrecision(significantDigits)),
            fxLValue: parseFloat(mFunc(xLNumber).toPrecision(significantDigits)),
            fxRValue: parseFloat(mFunc(xRNumber).toPrecision(significantDigits)),
        };
        
        result.push(currRes);
        resValue = xtValue;


        if (currRes.fxTValue > 0) {
            subtractor = xRNumber;
            xRNumber = xtValue;
        } else {
            subtractor = xLNumber;
            xLNumber = xtValue;
        }
        console.table(result);
        //console.log("EYYYYY", JSON.stringify(currRes));
    }

    console.log("Orayt value!", JSON.stringify(result));
    return result;
}


export const example = () => {
    console.log("YESSIR!")
};
export const example2 = () => {
    const mFunc = (cf = -10, cf1 = 1, cf2 = -4, cf3 = 1) => (xVal: number) => {
        return cf + cf1 * (xVal) + cf2 * (Math.pow(xVal, 2)) + cf3 * (Math.pow(xVal, 3));
    }

    const mFunc2 = (cf = -20, cf1 = -1, cf2 = 1, cf3 = 0) => (xVal) => {
        return cf + cf1 * (xVal) + cf2 * (Math.pow(xVal, 2)) + cf3 * (Math.pow(xVal, 3));
    }


    const defFunc = mFunc2();
    const tabulatedValues: ITabulatedValues = {};

    let foundRoot = false;
    let foundPositiveAndNegative = false;

    let startXValue = 0;

    let retries = 0;

    let limiter = 0;

    while (!foundPositiveAndNegative && !foundRoot && limiter < 100) {
        console.log("waz my value", startXValue);
        let lastLeftValue = startXValue - 1;
        let lastRightValue = startXValue + 1;

        
        if (typeof tabulatedValues[startXValue] !== 'number') {
            tabulatedValues[startXValue] = defFunc(startXValue);
        }
        if (typeof !tabulatedValues[lastLeftValue] !== 'number') {
            tabulatedValues[lastLeftValue] = defFunc(lastLeftValue);
        }
        if (typeof !tabulatedValues[lastRightValue] !== 'number') {
            tabulatedValues[lastRightValue] = defFunc(lastRightValue);
        }
        
        [startXValue, lastLeftValue, lastRightValue].map(val => {
            if(tabulatedValues[val] === 0) {
                foundRoot = true;
            }
        })

        if (foundRoot) {
            break;
        }


        if (tabulatedValues[startXValue] > 0) {
            if (tabulatedValues[lastLeftValue] < 0) {
                foundPositiveAndNegative = true;
                break;
            }
        } else if (tabulatedValues[startXValue] < 0) {
            if (tabulatedValues[lastRightValue] > 0) {
                foundPositiveAndNegative = true;
                break;
            }
        } else {
            foundRoot = true;
            break;
        }

        const compareLeft = tabulatedValues[startXValue] > tabulatedValues[lastLeftValue];
        const compareRight = tabulatedValues[startXValue] > tabulatedValues[lastRightValue];


        if ((compareLeft && compareRight) || (!compareLeft && !compareRight)) {
            //calculate the absolute difference and go to the one with the lesser difference

            const leftDiff = Math.abs(Math.abs(tabulatedValues[startXValue]) - Math.abs(tabulatedValues[lastLeftValue]));
            const rightDiff = Math.abs(Math.abs(tabulatedValues[startXValue]) - Math.abs(tabulatedValues[lastRightValue]));
            console.log("Difference", leftDiff, rightDiff)
            if (leftDiff > rightDiff) {
                startXValue = lastRightValue + 1;
            } else {
                startXValue = lastLeftValue - 1;
            }
        } else {
            if (compareLeft && !compareRight) {
                startXValue = lastLeftValue - 1;
            } else {
                startXValue = lastRightValue + 1;
            }
        }
        console.log(limiter, "TABULATED VALUES", JSON.stringify(tabulatedValues));
        limiter++;
    }

    console.log("Stopped at", startXValue)
    console.log("Final TABULATED VALUES", JSON.stringify(tabulatedValues));


    //get 0
    //get 1 and -1
    //tries: 3
    //if 0 > -1; go to 1 + 1


}

*/
