
import NumericalMethod, {IterationValue} from './index';

export default class Secant extends NumericalMethod {
    constructor() {
        super();
        this.rule = (resObj: IterationValue) => {
            this.maxSubtractor = this.largestNumber;
            this.minSubtractor = this.smallestNumber;

            this.smallestNumber = this.largestNumber;
            this.largestNumber = resObj.derivedNumber;
        };
        this.formula = () => {
            return this.largestNumber - (this.polynomialFunction(this.largestNumber) * ((this.largestNumber - this.smallestNumber)/(this.polynomialFunction(this.largestNumber) - this.polynomialFunction(this.smallestNumber))));
        }
    }
}