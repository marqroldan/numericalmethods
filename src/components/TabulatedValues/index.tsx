import './styles.scss';
import React from 'react';
import FieldGroup from '@Components/FieldGroup';
import Field from '@Components/Field';
import Input from '@Components/Input';
import Text from '@Components/Text';
import { polynomialFuncFactory, coefficientsFactory } from '@Utils/math';

interface XYValue {
  x: number;
  y: number;
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

export default class TabulatedValues extends React.PureComponent<Props> {
  state = {
    minValue: '0',
    maxValue: '0',
    polynomial: () => 0,
    values: [] as XYValue[],
    possiblePair: [] as Pair[],
  };

  generatorTimeout: ReturnType<typeof setTimeout> = setTimeout(() => null, 0);

  generateValues = () => {
    console.log('wazup tr');
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

    let tabulatedValues: XYValue[] = [];
    let possiblePair: Pair[] = [];

    for (let i = minValue; i <= maxValue; i++) {
      const tabValue = {
        x: i,
        y: polyFunc(i),
      };

      if (
        tabulatedValues[tabulatedValues.length - 1] &&
        tabulatedValues[tabulatedValues.length - 1].y > 0 != tabValue.y > 0
      ) {
        possiblePair.push({
          x1: tabulatedValues[tabulatedValues.length - 1].x,
          y1: tabulatedValues[tabulatedValues.length - 1].y,
          x2: tabValue.x,
          y2: tabValue.y,
        });
      }
      tabulatedValues.push(tabValue);
    }

    console.log('Coefficients Value:', coefficients);
    console.log(`Complete tabulated values from ${minValue} to ${maxValue}`);
    console.table(tabulatedValues);

    this.setState({ values: tabulatedValues, possiblePair });
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
    return (
      <div className={'TabulatedValues'}>
        <Text className={'heading3'}>Possible Pairs (WIP)</Text>
        <br />
        Currently done linearly ({this.state.possiblePair.length})
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
        Check the console (F12) for complete tabulated values (
        {this.state.values.length})
        <div className={'TabulatedValues__rows'}>
          {this.state.possiblePair.map((item, index) => {
            return (
              <div className={'TabulatedValues__row'} key={`${index}_`}>
                <div className={'TabulatedValues__rowValues'}>
                  <div className={'TabulatedValues__rowValue'}>
                    <Text className={'label'}>Low X</Text>
                    <div className={'TabulatedValues__value'}>{item.x1}</div>
                  </div>
                  <div className={'TabulatedValues__rowValue'}>
                    <Text className={'label'}>High X</Text>
                    <div className={'TabulatedValues__value'}>{item.x2}</div>
                  </div>
                </div>
                <div className={'TabulatedValues__rowValues'}>
                  <div className={'TabulatedValues__rowValue'}>
                    <Text className={'label'}>Low Y</Text>
                    <div className={'TabulatedValues__value'}>{item.y1}</div>
                  </div>
                  <div className={'TabulatedValues__rowValue'}>
                    <Text className={'label'}>High Y</Text>
                    <div className={'TabulatedValues__value'}>{item.y2}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
