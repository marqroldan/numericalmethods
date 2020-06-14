import '@Styles/main.scss';

import React from 'react';

import NumericalMethods from '@Methods';

import Header from '@Components/Header';
import Main from '@Components/Main';
import Text from '@Components/Text';

function App() {
  const METHOD = NumericalMethods.Bisection;
  const method = new METHOD();
  method.coefficients = [-10, 1, -4, 1];

  method.roundingRules = 4;

  method.process(5, 6);

  return (
    <div className="_container">
      <Header>
        <div style={{ display: 'flex', flex: 1 }}>
          <input type={'text'} />
          <Text className={'label'}>COEFFICIENTS</Text>
        </div>
        <input type={'text'} />
      </Header>
      <Main></Main>
    </div>
  );
}

export default App;
