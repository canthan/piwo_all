import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactSVG from 'react-svg';
// import { Component } from 'react';
import { Storage } from './components/storage/storage';
import './App.scss';

export default class App extends React.Component<{}, {}> {

  constructor(props) {
    super(props)
    this.state = {
      loaded: true
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ReactSVG
            path="./assets/img/logo.svg"
            className="logo-svg"
          />
          <h1 className="App-title">Storage app</h1>
        </header>
        <Storage />
      </div>
    );
  }
}

// export default App;
