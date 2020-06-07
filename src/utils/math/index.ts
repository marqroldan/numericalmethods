import * as MathInterfaces from './interfaces';

export const countPossibleRoots = (coefficients: MathInterfaces.ICoefficients): MathInterfaces.IPossibleRoots => {
    return coefficients.reduce((acc, value, index) => {
        if ((index !== 0 || index !== coefficients.length - 1) && value !== 0) {
            acc.positive += Number(value > 0);
            acc.negative += 0;
            acc.complex += 0;
        } 
        return acc;
    }, {} as MathInterfaces.IPossibleRoots)
}

export const polynomialFuncFactory = (coefficients: MathInterfaces.ICoefficients) => (xValue: number) => {
    return coefficients.reduce((acc: number, value, index) => {
        return acc + value * (Math.pow(xValue, index)); 
    }, 0)
}
