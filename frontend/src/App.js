import React, { Component } from 'react';
import './App.css';

class Module extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
  }
  render() {
    return (
      <div class="module">
        <h1>{this.title}</h1>
        <div class="options">
          <button class="button">Add</button>
          <button class="button">Update</button>
          <button class="button">Delete</button>
          <button class="button">Search</button>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div class="display">
        <h1 class="title">CunyClone</h1>
        
        <div class="row">
          <Module title="Student"></Module>
          <Module title="Instructor"></Module>
        </div>
        
        <div class="row">
          <Module title="Course"></Module>
          <Module title="Section"></Module>
        </div>

        <div class="row">
          <Module title="Department"></Module>
          <div class="module">
            <h1>Database</h1>
            <div>
              <button class="button">View Database</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
