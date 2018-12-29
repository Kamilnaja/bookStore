import React, { Component } from 'react';
import './App.css';
import AppState from './AppState';
import Display from './Display';

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppState>
          <Display ></Display>
        </AppState>
      </div>
    );
  }
}

export default App;
