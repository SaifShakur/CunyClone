import React, { Component } from 'react';
import './App.css';
import Module from './Module';

class App extends Component {
  render() {
    return (
      <div className="center">
        <div style={{ display: "inline-block", fontSize: "32px" }}><h1 className="title" >CunyClone</h1></div>
        <br></br>
        <div className="display">
          <Module title="Student"></Module>
          <Module title="Instructor"></Module>
          <Module title="Course"></Module>
          <Module title="Section"></Module>
          <Module title="Department"></Module>
          <Module title="Enrollment"></Module>
        </div>
      </div>
    );
  }
}

export default App;
