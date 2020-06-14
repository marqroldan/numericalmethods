import NumericalMethod, { IterationValue } from './NumericalMethod';
import Bisection from './bisection';
import Secant from './secant';
import RegulaFalsi from './regulafalsi';

interface Test {
  [key: string]: any;
}

export { NumericalMethod, IterationValue };

export default { Bisection, Secant, RegulaFalsi } as Test;
