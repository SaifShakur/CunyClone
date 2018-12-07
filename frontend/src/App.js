import React, { Component } from 'react';
import './App.css';

class Module extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;   // Student, Instructor etc
    this.inputs = {      // Options for adding a certain object into the database
      "Student": ["Student ID", "First Name", "Last Name", "Credits Allowed", "Total Credits", "Status"],
      "Instructor": ["Instructor ID", "First Name", "Last Name", "Department"],
      "Course": ["Course ID", "Course Number", "Title", "Department", "Credits"],
      "Section": ["Course ID", "Section Number", "Year", "Semester", "Room Number", "Time Slot", "Instructor ID", "Date Start", "Date End"],
      "Department": ["Department Name", "Office", "Abbreviation"]
    };
    this.columns = [];      // For the table when searching for the data row, the columns, pretty much the stuff in inputs
    for (let i in this.inputs[this.title]) { this.columns.push(<td>{this.inputs[this.title][i]}</td>); }
    this.columns.push(<td>Option</td>); // Extra column for buttons
    this.state = {     // States for the different view when add, update, or delete are clicked
      add: false,
      delete: false,
      update: false,
      visibility: "hidden",
      table_vis: "hidden",
      table_struct: <table className="table"></table>
    };
    this.Toggle_View = this.Toggle_View.bind(this);
    this.Get_Data = this.Get_Data.bind(this);
  }
  Toggle_View(type) { // Changes view of the module box
    this.setState({
      add: (type === "add") ? !this.state.add : false,
      delete: (type === "delete") ? !this.state.delete : false,
      update: (type === "update") ? !this.state.update : false,
    }, () => {
      this.setState({
        visibility: (this.state.add || this.state.delete || this.state.update) ? "visible" : "hidden",
        table_vis: (this.state.delete || this.state.update) ? "visible" : "hidden",
        table_struct: <table className="table"></table>
      }, () => this.Get_Data());
    });
  }
  Get_Data() {   // Fetches data from the backend to be outputted to the table
    if (this.state.delete || this.state.update) {
      fetch('http://localhost:3001/read/' + this.title.toLowerCase() + 's', {
        method: "GET",
        mode: "cors", 
        headers: { "Content-Type": "application/json" },
      }).then(res => { return res.json(); })
      .then(data => {
        this.setState({table_data: data}, () => {
          // Makes the table with the data received
          let row_col_vals = [];
          for (let i in this.state.table_data) { 
            let data_col = [];
            for (let j in this.state.table_data[i]) { data_col.push(<td>{this.state.table_data[i][j]}</td>); }
            /******* Button that needs to be connected to the new event we make *****/
            data_col.push(<td><button>{(this.state.update) ? "Update Data" : "Delete Data"}</button></td>);  
            row_col_vals.push(<tr>{data_col}</tr>);
          }
          let table = [
            (<table className="table">
              <thead>
                <tr>{this.columns}</tr>
              </thead>
              <tbody>{row_col_vals}</tbody>
            </table>)];
          this.setState({table_struct: table});
        });
      })
      .catch(error => console.error(error));
    }
    else {}
  }
  render() {
    // Inputs for when a user adds an object
    let children = [];
    if (this.state.add) {
      for (let i = 0; i < this.inputs[this.title].length; i++) {
        children.push(<input className="input" type="text" placeholder={this.inputs[this.title][i]} name={this.inputs[this.title][i]} />);
        if (i % 2 === 0 && i !== 0) { children.push(<br />); }
      }
      children.push(<br />);
      children.push(<button className="button">{"Add " + this.title}</button>);  
    }

    return (
      <div className="module" id={this.title}>
        <h1>{this.title}</h1>
        <div className="options">
          <button className="button" style={{"font-weight": (this.state.add) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("add")}>Add</button>
          <button className="button" style={{"font-weight": (this.state.update) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("update")}>Update</button>
          <button className="button" style={{"font-weight": (this.state.delete) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("delete")}>Delete</button>
        </div>
        <div style={{ visibility: this.state.visibility }}>
          {children}
        </div>
        <div style={{ visibility: this.state.table_vis }}>
          {this.state.table_struct}
        </div>
      </div>
    );
  }
}

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
        </div>
      </div>
    );
  }
}

export default App;
