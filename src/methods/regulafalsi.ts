
/*
Regula-Falsi

Iterative formula
Terminating condition
 => {
  absoluteError < x

  what is absoluteError?
  

 }

----

const answer = firstVal - (func(firstVal) * ((firstVal - zerothVal)/(func(firstVal) - func(zerothVal)))

*/


const countPossibleRoots = (coefficients: array) => {
    return coefficients.reduce((acc, value, index) => {
        if ((index !== 0 || index !== coefficients.length - 1) && value !== 0) {
            acc.positive += value > 0;
            acc.negative += 0;
            acc.complex += 0;
        } 
        return acc;
    }, {})
}


export const example = () => {
    const mFunc = (cf = -10, cf1 = 1, cf2 = -4, cf3 = 1) => (xVal) => {
        return cf + cf1 * (xVal) + cf2 * (Math.pow(xVal, 2)) + cf3 * (Math.pow(xVal, 3));
    }

    const mFunc2 = (cf = -20, cf1 = -1, cf2 = 1, cf3 = 0) => (xVal) => {
        return cf + cf1 * (xVal) + cf2 * (Math.pow(xVal, 2)) + cf3 * (Math.pow(xVal, 3));
    }


    const defFunc = mFunc2();
    const tabulatedValues = {};

    let foundRoot = false;
    let foundPositiveAndNegative = false;

    let startXValue = 0;

    let retries = 0;

    let limiter = 0;

    while (!foundPositiveAndNegative && !foundRoot && limiter < 100) {
        console.log("waz my value", startXValue);
        let lastLeftValue = startXValue - 1;
        let lastRightValue = startXValue + 1;

        if (!tabulatedValues[startXValue] || !tabulatedValues[lastLeftValue] || !tabulatedValues[lastRightValue]) {
            if (typeof tabulatedValues[startXValue] !== 'number') {
                tabulatedValues[startXValue] = defFunc(startXValue);
            }
            if (typeof !tabulatedValues[lastLeftValue] !== 'number') {
                tabulatedValues[lastLeftValue] = defFunc(lastLeftValue);
            }
            if (typeof !tabulatedValues[lastRightValue] !== 'number') {
                tabulatedValues[lastRightValue] = defFunc(lastRightValue);
            }
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
            //right bias?
            /*
                what would be a good bias?
            */
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
