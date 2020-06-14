import '@Styles/main.scss';

import React from 'react';

import NumericalMethods from '@Methods';

import Header from '@Components/Header';
import Main from '@Components/Main';
import Field from '@Components/Field';
import Input from '@Components/Input';

import FieldGroup from '@Components/FieldGroup';
import Options from '@Components/Options';
import { mathOperatorsArr } from '@Utils/math';

const METHOD = NumericalMethods.Bisection;
const method = new METHOD();
method.coefficients = [-10, 1, -4, 1];

method.roundingRules = 4;

method.process(5, 6);

export default class App extends React.PureComponent {
  state = {
    terminatingOperation: '',
    terminatingConditionValue: 0.0001,
  };

  btnClick = () => {
    console.log('I GOT PRESSED EYYY');
  };

  valueChange = (target: string) => (value: string) => {
    this.setState({
      [target]: value,
    });
  };

  render() {
    return (
      <div className="_container">
        <Header>
          <form className={'form flexCenterBetween'}>
            <div style={{ display: 'flex', flex: 1 }}>
              <FieldGroup>
                <Field label={'Coefficients'}>
                  <input type={'text'} />
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
                  <Input className={'small'} />
                </Field>
                <Field
                  label={
                    <>
                      Max (X<sub>1</sub>)
                    </>
                  }
                >
                  <Input className={'small'} />
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
                    className={'options-left'}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup label={'Rounding rules'}>
                <Field>
                  <Input
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
                    className={'small center'}
                    sublabel={
                      <>
                        X<sub>2</sub>
                      </>
                    }
                  />
                </Field>
              </FieldGroup>
            </div>
            <div>
              <input type={'submit'} />
            </div>
          </form>
        </Header>
        <Main>testy {JSON.stringify(this.state)}</Main>
      </div>
    );
  }
}
