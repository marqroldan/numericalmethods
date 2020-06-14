import '@Styles/main.scss';

import React from 'react';

import NumericalMethods from '@Methods';

import Header from '@Components/Header';
import Main from '@Components/Main';
import Field from '@Components/Field';
import Input from '@Components/Input';
import ButtonDropdown from '@Components/ButtonDropdown';
import PolynomialText from '@Components/PolynomialText';

import FieldGroup from '@Components/FieldGroup';
import Options from '@Components/Options';
import { mathOperatorsArr } from '@Utils/math';

const MethodsList = Object.keys(NumericalMethods);

interface State {
  [key: string]: any;
  method: typeof NumericalMethods;
}

export default class App extends React.PureComponent<{}, State> {
  formRef = React.createRef<HTMLFormElement>();

  state = {
    coefficients: '',
    method: '',
    smallestNumber: 4,
    largestNumber: 5,
    rr_smallestNumber: 5,
    rr_largestNumber: 5,
    rr_derivedNumber: 5,
    terminatingOperation: '',
    terminatingConditionValue: 0.0001,
    iterations: [],
  };

  btnClick = () => {
    console.log('I GOT PRESSED EYYY');
  };

  valueChange = (target: string) => (value: string) => {
    console.log('triggered');
    this.setState({
      [target]: value,
    });
  };

  formSubmit = () => {
    const method = new NumericalMethods[this.state.method]();

    method.coefficients = this.state.coefficients
      .split(' ')
      .reverse()
      .map((item) => parseFloat(item));

    method.roundingRules = {
      smallestNumber: this.state.rr_smallestNumber,
      largestNumber: this.state.rr_largestNumber,
      derivedNumber: this.state.rr_derivedNumber,
    };
    method.process(this.state.smallestNumber, this.state.largestNumber);

    console.log('Form submitted');

    this.setState({
      iterations: method.iterations,
    });
  };

  render() {
    return (
      <div className="_container">
        <Header>
          <form ref={this.formRef} className={'form flexCenterBetween'}>
            <div style={{ display: 'flex', flex: 1 }}>
              <FieldGroup>
                <Field label={'Coefficients'}>
                  <Input
                    value={this.state.coefficients}
                    onChangeValue={this.valueChange('coefficients')}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field
                  label={
                    <>
                      Min (X<sub>0</sub>)
                    </>
                  }
                >
                  <Input
                    className={'small'}
                    value={this.state.smallestNumber}
                    onChangeValue={this.valueChange('smallestNumber')}
                  />
                </Field>
                <Field
                  label={
                    <>
                      Max (X<sub>1</sub>)
                    </>
                  }
                >
                  <Input
                    className={'small'}
                    value={this.state.largestNumber}
                    onChangeValue={this.valueChange('largestNumber')}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field label={'Terminating Conditions'}>
                  <Options
                    options={mathOperatorsArr}
                    value={this.state.terminatingOperation}
                    onChangeValue={this.valueChange('terminatingOperation')}
                  />
                  <Input
                    value={this.state.terminatingConditionValue}
                    onChangeValue={this.valueChange(
                      'terminatingConditionValue'
                    )}
                    className={'options-left medium'}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup label={'Rounding rules'}>
                <Field>
                  <Input
                    value={this.state.rr_smallestNumber}
                    onChangeValue={this.valueChange('rr_smallestNumber')}
                    className={'small center'}
                    sublabel={
                      <>
                        X<sub>0</sub>
                      </>
                    }
                  />
                </Field>
                <Field>
                  <Input
                    value={this.state.rr_largestNumber}
                    onChangeValue={this.valueChange('rr_largestNumber')}
                    className={'small center'}
                    sublabel={
                      <>
                        X<sub>1</sub>
                      </>
                    }
                  />
                </Field>
                <Field>
                  <Input
                    value={this.state.rr_derivedNumber}
                    onChangeValue={this.valueChange('rr_derivedNumber')}
                    className={'small center'}
                    sublabel={
                      <>
                        X<sub>2</sub>
                      </>
                    }
                  />
                </Field>
              </FieldGroup>
              <FieldGroup label={'Polynomial Function'}>
                <PolynomialText value={this.state.coefficients} />
              </FieldGroup>
            </div>
            <div>
              <ButtonDropdown
                value={this.state.method}
                onClick={this.formSubmit}
                onChangeValue={this.valueChange('method')}
                options={MethodsList}
              />
            </div>
          </form>
        </Header>
        <Main>
          testy {JSON.stringify(this.state)}
          <div>
            {this.state.iterations.map((item, index) => {
              return <div key={`${index}__`}>{JSON.stringify(item)}</div>;
            })}
          </div>
        </Main>
      </div>
    );
  }
}
