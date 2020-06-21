import './styles.scss';
import React from 'react';
import { coefficientsFactory } from '@Utils/math';
import Text from '@Components/Text';

interface Props {
  value: string;
}

export default class PolynomialText extends React.PureComponent<Props> {
  state = {
    polynomialString: [],
  };

  updateText = () => {
    const coefficients = coefficientsFactory(this.props.value.toString());

    const polynomialString = coefficients.reduce<JSX.Element[]>(
      (acc: JSX.Element[], coeff: number, index: number) => {
        if (coeff === 0) {
          return acc;
        }

        let res: JSX.Element = <></>;
        let sign = coeff < 0 ? '-' : index === 0 ? '' : '+';

        let numText =
          coeff == 1
            ? index == coefficients.length - 1
              ? `${sign}${coeff}`
              : `${sign}`
            : `${sign}${Math.abs(coeff)}`;

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
    return (
      <div className={'PolynomialText'}>
        <Text className={'heading3'}>Polynomial Text</Text>
        <div className={'PolynomialText__value'}>
          {this.state.polynomialString}
        </div>
      </div>
    );
  }
}
