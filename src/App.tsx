import '@Styles/main.scss';

import React from 'react';

import NumericalMethods from '@Methods';

import Header from '@Components/Header';
import Main from '@Components/Main';
import Field from '@Components/Field';
import Input from '@Components/Input';

import FieldGroup from '@Components/FieldGroup';

function App() {
  const METHOD = NumericalMethods.Bisection;
  const method = new METHOD();
  method.coefficients = [-10, 1, -4, 1];

  method.roundingRules = 4;

  method.process(5, 6);

  return (
    <div className="_container">
      <form>
        <Header>
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
                <input type={'text'} />
              </Field>
            </FieldGroup>

            <FieldGroup label={'Rounding rules'}>
              <Field>
                <Input className={'small'} />
              </Field>
              <Field>
                <Input className={'small'} />
              </Field>
            </FieldGroup>
          </div>
          <div>
            <input type={'submit'} />
          </div>
        </Header>
      </form>
      <Main></Main>
    </div>
  );
}

export default App;
