import './styles.scss';
import React from 'react';
import FieldGroup from '@Components/FieldGroup';
import Field from '@Components/Field';
import Input from '@Components/Input';
import Text from '@Components/Text';
import { polynomialFuncFactory, coefficientsFactory } from '@Utils/math';

interface Props {
  coefficients: string;
}

export default class TabulatedValues extends React.PureComponent<Props> {
  state = {
    minValue: '0',
    maxValue: '0',
    polynomial: () => 0,
  };

  valueChange = (target: string) => (value: string) => {
    console.log('triggered');
    this.setState({
      [target]: value,
    });
  };

  render() {
    return (
      <div className={'TabulatedValues'}>
        <Text className={'heading3'}>Tabulated Values</Text>
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
      </div>
    );
  }
}
