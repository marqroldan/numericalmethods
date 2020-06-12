import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegulaFalsi from '@Methods/regulafalsi';

function App() {

  const method = new RegulaFalsi();
  method.coefficients = [
    -10,1,-4,1
  ];
  
  method.process(4, 5);

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
