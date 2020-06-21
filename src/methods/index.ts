import NumericalMethod, * as NumericalMethodTypes from './NumericalMethod';
import Bisection from './root-finder/bisection';
import Secant from './root-finder/secant';
import RegulaFalsi from './root-finder/regulafalsi';

interface NumericalMethods {
  [key: string]: any;
}

export { NumericalMethod, NumericalMethodTypes };

export default { Bisection, Secant, RegulaFalsi } as NumericalMethods;
