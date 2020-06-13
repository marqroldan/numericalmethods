import '@Styles/main.scss';

import React from 'react';
import logo from './logo.svg';
import RegulaFalsi from '@Methods/regulafalsi';
import Secant from '@Methods/secant';
import Bisection from '@Methods/bisection';

import Header from '@Components/Header';
import Main from '@Components/Main';

function App() {

  const METHOD = Bisection;
  const method = new METHOD();
  method.coefficients = [
    -10,1,-4,1
  ];

  method.roundingRules = 4;


  method.process(5, 6);

  return (
    <div className="_container">
      <Header>
        Inserted text
      </Header>
      <Main>

      </Main>
    </div>
  );
}

export default App;
