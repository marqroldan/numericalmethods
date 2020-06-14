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
    selectedOperator: 'lte',
  };

  btnClick = () => {
    console.log('I GOT PRESSED EYYY');
  };

  selectedOperatorChange = (value: string) => {
    this.setState({
      selectedOperator: value,
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
                    selectedValue={this.state.selectedOperator}
                    onChange={this.selectedOperatorChange}
                  />
                  <Input className={'options-left'} />
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
        <Main>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                padding: 20,
                backgroundColor: 'red',
                height: 100,
                width: 100,
                position: 'relative',
              }}
            >
              asdkljadsl
              <div
                style={{
                  display: 'inline-flex',
                  padding: 10,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(255,255,255,0.6)',
                }}
              >
                testy
              </div>
            </div>
            <div onClick={this.btnClick}>asdasdasd</div>
            <input type="button" value="hi" />
          </div>
        </Main>
      </div>
    );
  }
}
