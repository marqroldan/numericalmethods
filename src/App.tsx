import '@Styles/main.scss';

import React from 'react';

import NumericalMethods, {
  NumericalMethod,
  NumericalMethodTypes,
} from '@Methods';

import Header from '@Components/Header';
import Main from '@Components/Main';
import Field from '@Components/Field';
import Input from '@Components/Input';
import ButtonDropdown from '@Components/ButtonDropdown';
import PolynomialText from '@Components/PolynomialText';
import IterationTable from '@Components/IterationTable';

import FieldGroup from '@Components/FieldGroup';
import Options from '@Components/Options';
import { mathOperators, mathOperatorsArr } from '@Utils/math';

const MethodsList = Object.keys(NumericalMethods);

interface State {
  [key: string]: any;
  method: typeof MethodsList[number];
  coefficients: string;
  smallestNumber: string;
  largestNumber: string;
  rr_smallestNumber: string;
  rr_largestNumber: string;
  rr_derivedNumber: string;
  rr_fx0: string;
  rr_fx1: string;
  rr_fx2: string;
  terminatingOperation: keyof typeof mathOperators;
  terminatingConditionValue: string;
  iterations: NumericalMethodTypes.IterationObject[];
  settings: NumericalMethodTypes.IterationResult;
}

export default class App extends React.PureComponent<{}, State> {
  formRef = React.createRef<HTMLFormElement>();

  state = {
    coefficients: '1 -4 1 -10',
    method: '',
    smallestNumber: '4',
    largestNumber: '5',
    rr_smallestNumber: '4',
    rr_largestNumber: '4',
    rr_derivedNumber: '4',
    rr_fx0: '5',
    rr_fx1: '5',
    rr_fx2: '5',
    terminatingOperation: 'lte' as State['terminatingOperation'],
    terminatingConditionValue: '0.0001',
    iterations: [],
    settings: {} as State['settings'],
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
    const method: NumericalMethod = new NumericalMethods[this.state.method]();

    method.coefficients = this.state.coefficients;
    method.terminatingCondition = this.state.terminatingOperation;

    method.roundingRules = {
      smallestNumber: this.state.rr_smallestNumber,
      largestNumber: this.state.rr_largestNumber,
      derivedNumber: this.state.rr_derivedNumber,
      f_smallestNumber: this.state.rr_fx0,
      f_largestNumber: this.state.rr_fx1,
      f_derivedNumber: this.state.rr_fx2,
    };
    method.process(this.state.smallestNumber, this.state.largestNumber);

    console.log('Form submitted');

    this.setState({
      iterations: method.iterations,
      settings: method.roundingRules as State['settings'],
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
                <Field>
                  <Input
                    value={this.state.rr_fx0}
                    onChangeValue={this.valueChange('rr_fx0')}
                    className={'small center'}
                    sublabel={
                      <>
                        f(X<sub>0</sub>)
                      </>
                    }
                  />
                </Field>
                <Field>
                  <Input
                    value={this.state.rr_fx1}
                    onChangeValue={this.valueChange('rr_fx1')}
                    className={'small center'}
                    sublabel={
                      <>
                        f(X<sub>1</sub>)
                      </>
                    }
                  />
                </Field>
                <Field>
                  <Input
                    value={this.state.rr_fx2}
                    onChangeValue={this.valueChange('rr_fx2')}
                    className={'small center'}
                    sublabel={
                      <>
                        f(X<sub>2</sub>)
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
          <div>
            <IterationTable
              data={this.state.iterations}
              settings={this.state.settings}
            />
          </div>
        </Main>
      </div>
    );
  }
}
