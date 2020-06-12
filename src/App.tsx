import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegulaFalsi from '@Methods/regulafalsi';
import Secant from '@Methods/secant';
import Bisection from '@Methods/bisection';

function App() {

  const method = new Secant();
  method.coefficients = [
    -10,1,-4,1
  ];
  
  method.process(2, 3);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
