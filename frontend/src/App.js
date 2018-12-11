import React, { Component } from 'react';
import './App.css';

class Module extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;   
    this.inputs = {      
      "Student": ["Student ID", "First Name", "Last Name", "Credits Allowed", "Total Credits"],
      "Instructor": ["Instructor ID", "First Name", "Last Name", "Department"],
      "Course": ["Course ID", "Course Number", "Title", "Department", "Credits"],
      "Section": ["Course ID", "Section Number", "Year", "Semester", "Room Number", "Time Slot", "Instructor ID", "Date Start", "Date End"],
      "Department": ["Department Name", "Office", "Abbreviation"]
    };
    this.columns = [];    
    for (let i in this.inputs[this.title]) { this.columns.push(<td>{this.inputs[this.title][i]}</td>); }
    this.columns.push(<td>Option</td>); 
    this.state = {     
      add: false,
      delete: false,
      update: false,
      view: false,
      visibility: "hidden",
      table_vis: "hidden",
      table_struct: <table className="table"></table>
    };
    this.Toggle_View = this.Toggle_View.bind(this);
    this.Get_Data = this.Get_Data.bind(this);
    this.UserChangeData = this.UserChangeData.bind(this);
  }
  GetBodyPost() {
    let bodyPost;
    if (this.title === "Student") {
      bodyPost = {
        "sid": document.getElementById("StudentStudent ID").value,
        "first_name": document.getElementById("StudentFirst Name").value,
        "last_name": document.getElementById("StudentLast Name").value,
        "credits_allowed": document.getElementById("StudentCredits Allowed").value,
        "credits": document.getElementById("StudentTotal Credits").value
      }
    }
    else if (this.title === "Instructor") {
      bodyPost = {
        "instructor_ID": document.getElementById("InstructorInstructor ID").value,
        "first_name": document.getElementById("InstructorFirst Name").value,
        "last_name": document.getElementById("InstructorLast Name").value,
        "dept": document.getElementById("InstructorDepartment").value
      }
    }
    else if (this.title === "Course") {
      bodyPost = {
        "course_ID": document.getElementById("CourseCourse ID").value,
        "course_num": document.getElementById("CourseCourse Number").value,
        "title": document.getElementById("CourseTitle").value,
        "dept": document.getElementById("CourseDepartment").value,
        "credits": document.getElementById("CourseCredits").value
      }
    }
    else if (this.title === "Section") {
      bodyPost = {
        "section_ID": document.getElementById("SectionSection ID").value,
        "course_ID": document.getElementById("SectionCourse ID").value,
        "section_num": document.getElementById("SectionSection Number").value,
        "year": document.getElementById("SectionYear").value,
        "semester": document.getElementById("SectionSemester").value,
        "room_num": document.getElementById("SectionRoom Number").value,
        "time_slot": document.getElementById("SectionTime Slot").value,
        "instructor_ID": document.getElementById("SectionInstructor ID").value
      }
    }
    else if (this.title === "Department") {
      bodyPost = {
        "dept_name": document.getElementById("DepartmentDepartment Name").value,
        "office": document.getElementById("DepartmentOffice").value,
        "abbreviation": document.getElementById("DepartmentAbbreviation").value
      }
    }
    return bodyPost;
  }
  Toggle_View(type) {
    this.setState({
      add: (type === "add") ? !this.state.add : false,
      delete: (type === "delete") ? !this.state.delete : false,
      update: (type === "update") ? !this.state.update : false,
      view: (type === "view") ? !this.state.view : false
    }, () => {
      this.setState({
        visibility: (this.state.add || this.state.delete || this.state.update || this.state.view) ? "visible" : "hidden",
        table_vis: (this.state.delete || this.state.update || this.state.view) ? "visible" : "hidden",
        table_struct: <table className="table"></table>
      }, () => {
        if (this.state.add) { } 
        else { this.Get_Data(); }
      });
    });
  }
  Get_Data() {  
    fetch('http://localhost:3001/read/' + this.title.toLowerCase() + 's', {
      method: "GET",
      mode: "cors", 
      headers: { "Content-Type": "application/json" },
    }).then(res => { return res.json(); })
    .then(data => {
      this.setState({table_data: data}, () => {
        let row_col_vals = [];
        for (let i in this.state.table_data) { 
          let data_col = [];
          for (let j in this.state.table_data[i]) { data_col.push(<td>{this.state.table_data[i][j]}</td>); }
          if (this.state.update || this.state.delete) { data_col.push(<td><button onClick={ () => this.UserChangeData(this.title+"row"+i)}>Select</button></td>); }
          row_col_vals.push(<tr id={this.title+"row"+i}>{data_col}</tr>);
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
    }).catch(error => console.error(error));
  }
  AddData() {
    fetch("http://localhost:3001/create/" + this.title.toLowerCase(), {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(this.GetBodyPost())
    }).then(res => console.log(res))
    .catch(error => console.error(error) )
    .then(() => this.Toggle_View("view"));
  }
  DeleteData() {
    fetch("http://localhost:3001/delete/delete_" + this.title.toLowerCase(), {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(this.GetBodyPost())
    }).then(res => console.log(res))
    .then(() => this.Get_Data())
    .catch(error => console.error(error));
  }
  UpdateData() {
    console.log(this.GetBodyPost());
    let urls = [];
    if (this.title === "Student") { urls.push("/student_name"); }
    else if (this.title === "Instructor") { urls.push("/instructor_name"); }
    else if (this.title === "Course") { urls.push("/credits"); urls.push("/title"); }
    else if (this.title === "Section") { urls.push("/update_section_instructor"); }
    else if (this.title === "Department") { urls.push("/dept_office"); }
    fetch("http://localhost:3001/update" + urls[0], {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(this.GetBodyPost())
    }).then(() => {
      if (urls[1]) {
        fetch("http://localhost:3001/update" + urls[1], {
          method: "POST",
          mode: "cors",
          headers: {"Content-Type": "application/json" },
          body: JSON.stringify(this.GetBodyPost())
        }).then(res => console.log(res))
        .catch(error => console.error(error));
      }
    }).then(res => console.log(res))
    .catch(error => console.error(error))
    .then(() => this.Get_Data());
  }
  UserChangeData(rowID) {
    let row = document.getElementById(rowID);
    if (this.state.update || this.state.delete) {
      for (let i = 0; i < row.childNodes.length - 1; i++) {
        document.getElementById(this.title+this.inputs[this.title][i]).value = row.childNodes[i].innerHTML;
      }
    }
  }
  Inputs() {
    let children = [];
    for (let i = 0; i < this.inputs[this.title].length; i++) {
      if (!this.state.delete) { children.push(<input className="input" type="text" placeholder={this.inputs[this.title][i]} id={this.title+this.inputs[this.title][i]}/>); }
      else { children.push(<input className="input" type="text" readonly="true" placeholder={this.inputs[this.title][i]} id={this.title+this.inputs[this.title][i]}/>); }
      if (i % 2 === 0 && i !== 0) { children.push(<br />); }
    }
    children.push(<br />);
    if (this.state.add) { children.push(<button onClick={() => this.AddData()} className="button">{"Add " + this.title}</button>); }
    else if (this.state.update) { children.push(<button onClick={() => this.UpdateData()} className="button">{"Update " + this.title}</button>); }
    else if (this.state.delete) { children.push(<button onClick={() => this.DeleteData()} className="button">{"Delete " + this.title}</button>); }
    return children;
  }
  render() {
    return (
      <div className="module" id={this.title}>
        <h1>{this.title}</h1>
        <div className="options">
          <button className="button" style={{"fontWeight": (this.state.add) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("add")}>Add</button>
          <button className="button" style={{"fontWeight": (this.state.update) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("update")}>Update</button>
          <button className="button" style={{"fontWeight": (this.state.delete) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("delete")}>Delete</button>
          <button className="button" style={{"fontWeight": (this.state.view) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("view")}>View All</button>
        </div>
        <div style={{ visibility: this.state.visibility }}>
          { (this.state.add) ? this.Inputs() : null }
        </div>
        <div style={{ visibility: this.state.table_vis }}>
          {this.state.table_struct}
          <div id={this.title+" inputs"}>{ (this.state.update || this.state.delete) ? this.Inputs() : null }</div>
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
