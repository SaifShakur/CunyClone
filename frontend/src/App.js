import React, { Component } from 'react';
import './App.css';

class Module extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.inputs = {
      "Student": ["Student ID", "First Name", "Last Name", "Credits Allowed", "Total Credits", "Status"],
      "Instructor": ["Instructor ID", "First Name", "Last Name", "Department"],
      "Course": ["Course ID", "Course Number", "Title", "Department", "Credits"],
      "Section": ["Course ID", "Section Number", "Year", "Semester", "Room Number", "Time Slot", "Instructor ID", "Date Start", "Date End"],
      "Department": ["Department Name", "Office", "Abbreviation"]
    };
    this.state = {
      add: false,
      delete: false,
      update: false,
      visibility: "hidden",
      table_vis: "hidden"
    };
    this.Toggle_View = this.Toggle_View.bind(this);
    this.Get_Data = this.Get_Data.bind(this);
  }
  Toggle_View(type) {
    this.setState({
      add: (type === "add") ? !this.state.add : false,
      delete: (type === "delete") ? !this.state.delete : false,
      update: (type === "update") ? !this.state.update : false,
    }, () => {
      this.setState({
        visibility: (this.state.add) ? "visible" : "hidden",
        table_vis: (this.state.delete || this.state.update) ? "visible" : "hidden"
      });
    });
  }
  Get_Data() {
    fetch('http://localhost:3001/read/'+this.title.toLowerCase()+'s', {
      method: "GET",
      mode: "no-cors",
    }).then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.error('Error'));
  }
  render() {
    let children = [];
    for (let i = 0; i < this.inputs[this.title].length; i++) {
      children.push(<input className="input" type="text" placeholder={this.inputs[this.title][i]} name={this.inputs[this.title][i]} />);
    }
    children.push(<br/>);
    children.push(<button className="button" onClick={() => this.Get_Data()}>{(this.state.add) ? "Add "+this.title : "Search "+this.title}</button>);

    return (
      <div className="module" id={this.title}>
        <h1>{this.title}</h1>
        <div className="options">
          <button className="button" onClick={() => this.Toggle_View("add")}>Add</button>
          <button className="button" onClick={() => this.Toggle_View("update")}>Update</button>
          <button className="button" onClick={() => this.Toggle_View("delete")}>Delete</button>
        </div>
        <div style={{visibility: this.state.visibility}}>
          {children}
        </div>
        <div style={{visibility: this.state.table_vis}}>
          <table>

          </table>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="center">
        <div style={{display: "inline-block", fontSize: "32px"}}><h1 className="title" >CunyClone</h1></div>
        <br></br>
        <div className="display">
          <Module title="Student"></Module>
          <Module title="Instructor"></Module>
          <Module title="Course"></Module>
          <Module title="Section"></Module>
          <Module title="Department"></Module>
          <div className="module">
            <h1>Database</h1>
            <div>
              <button className="button">View Database</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

 export default App;
