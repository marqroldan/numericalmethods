import './styles.scss';
import React from 'react';
import FieldGroup from '@Components/FieldGroup';
import Field from '@Components/Field';
import Input from '@Components/Input';
import Text from '@Components/Text';
import { polynomialFuncFactory, coefficientsFactory } from '@Utils/math';

interface XYValue {
  [key: string]: number;
}

interface Pair {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface Props {
  coefficients: string;
}

interface State {
  [key: string]: any;
  minValue: string | number;
  maxValue: string | number;
  polynomial: Function;
  values: {
    [key: string]: XYValue;
  };
  possiblePair: { [key: string]: Pair[] };
  indexes: number[];
}

export default class TabulatedValues extends React.PureComponent<Props, State> {
  state = {
    minValue: '0',
    maxValue: '0',
    polynomial: () => 0,
    values: {
      /**
        [coefficient string]: {
          [x]: [y]
        } 

       */
    } as {
      [key: string]: XYValue;
    },
    possiblePair: {} as { [key: string]: Pair[] },
    indexes: [],
  };

  generatorTimeout: ReturnType<typeof setTimeout> = setTimeout(() => null, 0);

  generateValues = () => {
    console.log('wazup tr');
    const pastData = this.state.values[this.props.coefficients] || {};
    const coefficients = coefficientsFactory(this.props.coefficients);
    const polyFunc = polynomialFuncFactory(coefficients.reverse());

    const minValue = Math.min(
      parseFloat(this.state.minValue),
      parseFloat(this.state.maxValue)
    );
    const maxValue = Math.max(
      parseFloat(this.state.minValue),
      parseFloat(this.state.maxValue)
    );

    if (!isFinite(minValue) || !isFinite(maxValue)) {
      this.setState({
        minValue: 0,
        maxValue: 0,
      });
      return;
    }

    let tabulatedValues: XYValue = {};
    let possiblePair: Pair[] = [];
    let indexes: number[] = [];

    for (let i = minValue; i <= maxValue; i++) {
      const tabValue =
        pastData[i] != null
          ? {
              x: i,
              y: pastData[i],
            }
          : {
              x: i,
              y: polyFunc(i),
            };

      if (
        tabulatedValues[i - 1] != null &&
        tabulatedValues[i - 1] > 0 != tabValue.y > 0
      ) {
        possiblePair.push({
          x1: i - 1,
          y1: tabulatedValues[i - 1],
          x2: tabValue.x,
          y2: tabValue.y,
        });
      }
      indexes.push(i);
      tabulatedValues[i] = tabValue.y;
    }

    console.log('Coefficients Value:', coefficients);
    console.log(`Complete tabulated values from ${minValue} to ${maxValue}`);
    console.table(tabulatedValues);

    this.setState((state) => ({
      minValue,
      maxValue,
      values: { ...state.values, [this.props.coefficients]: tabulatedValues },
      possiblePair: {
        ...state.possiblePair,
        [this.props.coefficients]: possiblePair,
      },
      indexes,
    }));
  };

  valueChange = (target: string) => (value: string) => {
    console.log('triggered');
    this.setState(
      {
        [target]: value,
      },
      () => {
        clearTimeout(this.generatorTimeout);
        this.generatorTimeout = setTimeout(this.generateValues, 1000);
      }
    );
  };

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.coefficients != prevProps.coefficients) {
      clearTimeout(this.generatorTimeout);
      this.generatorTimeout = setTimeout(this.generateValues, 1000);
    }
  }

  render() {
    const possiblePairs =
      this.state.possiblePair[this.props.coefficients] || [];
    const tabulatedValues = this.state.values[this.props.coefficients] || {};
    return (
      <div className={'TabulatedValues'}>
        <Text className={'heading3'}>Values Locator</Text>
        <div className={'TabulatedValuesRanges'}>
          <Field label={'Minimum'}>
            <Input
              value={this.state.minValue}
              onChangeValue={this.valueChange('minValue')}
              className={'small center'}
            />
          </Field>
          <Field label={'Maximum'}>
            <Input
              value={this.state.maxValue}
              onChangeValue={this.valueChange('maxValue')}
              className={'small center'}
            />
          </Field>
        </div>
        <br />
        <Text className={'heading3'}>Possible Pairs</Text>
        <div className={'TabulatedValues__rows'}>
          <div className={'TabulatedValues__table'}>
            <div
              className={
                'TabulatedValues__tableRow TabulatedValues__tableRow--header'
              }
            >
              <div className={'TabulatedValues__tableCol'}>X</div>
              <div className={'TabulatedValues__tableCol'}>f(X)</div>
            </div>
            {possiblePairs.map((item, index) => {
              return (
                <>
                  <div className={'TabulatedValues__tableRow'}>
                    <div className={'TabulatedValues__tableCol'}>{item.x1}</div>
                    <div className={'TabulatedValues__tableCol'}>{item.y1}</div>
                  </div>

                  <div className={'TabulatedValues__tableRow'}>
                    <div className={'TabulatedValues__tableCol'}>{item.x2}</div>
                    <div className={'TabulatedValues__tableCol'}>{item.y2}</div>
                  </div>
                  {index !== possiblePairs.length - 1 ? <br /> : null}
                </>
              );
            })}
          </div>
        </div>
        <br />
        <Text className={'heading3'}>Tabulated Values</Text>
        <div className={'TabulatedValues__table'}>
          <div
            className={
              'TabulatedValues__tableRow TabulatedValues__tableRow--header'
            }
          >
            <div className={'TabulatedValues__tableCol'}>X</div>
            <div className={'TabulatedValues__tableCol'}>f(X)</div>
          </div>
          {this.state.indexes.map((item) => {
            return (
              <div className={'TabulatedValues__tableRow'}>
                <div className={'TabulatedValues__tableCol'}>{item}</div>
                <div className={'TabulatedValues__tableCol'}>
                  {tabulatedValues[item]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
