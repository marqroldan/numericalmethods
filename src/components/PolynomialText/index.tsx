import React from 'react';

interface Props {
  value: string;
}

export default class PolynomialText extends React.PureComponent<Props> {
  state = {
    polynomialString: [],
  };

  updateText = () => {
    const coefficients = this.props.value
      .toString()
      .trim()
      .split(' ')
      .reduce<number[]>((acc, val) => {
        if (val != null) {
          const parsedVal = parseFloat(val);
          if (isFinite(parsedVal)) {
            acc.push(parsedVal);
          }
        }
        return acc;
      }, []);

    const polynomialString = coefficients.reduce<JSX.Element[]>(
      (acc: JSX.Element[], coeff: number, index: number) => {
        if (coeff === 0) {
          return acc;
        }

        let res: JSX.Element = <></>;
        let sign = coeff < 0 ? '-' : index === 0 ? '' : '+';

        let numText =
          coeff == 1 && index === 0 ? `${sign}` : `${sign}${Math.abs(coeff)}`;

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
  };

  componentDidMount() {
    this.updateText();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.value !== prevProps.value) {
      this.updateText();
    }
  }

  render() {
    return this.state.polynomialString.reverse();
  }
}
