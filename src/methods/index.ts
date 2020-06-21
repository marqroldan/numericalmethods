import NumericalMethod, * as NumericalMethodTypes from './NumericalMethod';
import Bisection from './bisection';
import Secant from './secant';
import RegulaFalsi from './regulafalsi';

interface NumericalMethods {
  [key: string]: any;
}

export { NumericalMethod, NumericalMethodTypes };

export default { Bisection, Secant, RegulaFalsi } as NumericalMethods;
