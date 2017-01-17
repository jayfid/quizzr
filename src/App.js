import React, { Component } from 'react';
import Quiz from './Quiz.js';
import './vinyl.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      started: false,
    };
  }
  showIntro() {
    return (
      <div>
        <div className="App-header">
          <h1 className="welcome tpush-50 bpush-30">Welcome to GeoQuizzr!</h1>
          <p className="font-style-a">Fast, fun, geographical questions.</p>
        </div>
        <div className="App-content">
          <button className="btn bpush-50 color-bg-white color-text-black font-size-b lpad-30 rpad-30 tpad-10 bpad-10" onClick={() => { this.start() } }>Begin</button>
        </div>
      </div>
    );
  }
  start() {
    this.setState({ started: true });
  }
  getContent() {
    if (!this.state.started) {
      return this.showIntro();
    }
    return <Quiz />
  }
  render() {
    let classes = (this.state.started) ? 'App tpush-30 started' : 'App tpush-30 not-started';
    return (
      <div className={classes}>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
