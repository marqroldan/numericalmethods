import React from 'react';

interface Props {
  value: string;
}

export default class PolynomialText extends React.PureComponent<Props> {
  state = {
    polynomialString: [],
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.value !== prevProps.value) {
      const coefficients = this.props.value.toString().split(' ');

      const polynomialString = coefficients.reduce<JSX.Element[]>(
        (acc: JSX.Element[], coeff: string, index: number) => {
          if (parseFloat(coeff) === 0) {
            return acc;
          }

          let res: JSX.Element = <></>;

          let numText = '';
          if (parseFloat(coeff) !== 1) {
            if (index === 0) {
              numText = coeff;
            } else {
              numText = parseFloat(coeff) >= 0 ? `+${coeff}` : coeff;
            }
          } else {
            if (index !== 0) {
              numText = '+';
            }
          }

          const expText = coefficients.length - (index + 1);
          res = (
            <React.Fragment key={`${index}_`}>
              {numText}
              {expText > 0 ? (
                <>
                  x<sup>{expText > 1 ? expText : ''}</sup>
                </>
              ) : null}
            </React.Fragment>
          );

          return res ? acc.concat(res) : acc;
        },
        []
      );

      this.setState({
        polynomialString,
      });
    }
  }

  render() {
    return this.state.polynomialString.reverse();
  }
}
