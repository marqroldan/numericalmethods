
import NumericalMethod, {IterationValue} from './NumericalMethod';

export default class Bisection extends NumericalMethod {
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
            return (this.smallestNumber + this.largestNumber) / 2;
        }
    }
}