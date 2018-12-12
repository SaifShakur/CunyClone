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
        "Section": ["Section ID", "Course ID", "Section Number", "Year", "Semester", "Room Number", "Time Slot", "Instructor ID", "Capacity"],
        "Department": ["Department Name", "Office", "Abbreviation"],
        "Enrollment": ["Student ID", "Section ID"]
      };
      this.columns = [];    
      for (let i in this.inputs[this.title]) { this.columns.push(<td>{this.inputs[this.title][i]}</td>); }
      this.columns.push(<td>Option</td>); 
      this.state = {     
        add: false,
        delete: false,
        update: false,
        search: false,
        view: false,
        visibility: "hidden",
        table_vis: "hidden",
        table_struct: <table className="table"></table>,
        search_table: <table className="table"></table>
      };
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
          "instructor_ID": document.getElementById("SectionInstructor ID").value,
          "capacity": document.getElementById("SectionCapacity").value
        }
      }
      else if (this.title === "Department") {
        bodyPost = {
          "dept_name": document.getElementById("DepartmentDepartment Name").value,
          "office": document.getElementById("DepartmentOffice").value,
          "abbreviation": document.getElementById("DepartmentAbbreviation").value
        }
      }
      else if (this.title === "Enrollment") {
        bodyPost = {
          "section_ID": document.getElementById("EnrollmentSection ID").value,
          "student_ID": document.getElementById("EnrollmentStudent ID").value
        }
      }
      return bodyPost;
    }
    Toggle_View(type) {
      this.setState({
        add: (type === "add") ? !this.state.add : false,
        delete: (type === "delete") ? !this.state.delete : false,
        update: (type === "update") ? !this.state.update : false,
        search: (type === "search") ? !this.state.search : false,
        view: (type === "view") ? !this.state.view : false
      }, () => {
        this.setState({
          visibility: (this.state.add || this.state.delete || this.state.update || this.state.view) ? "visible" : "hidden",
          table_vis: (this.state.delete || this.state.update || this.state.view) ? "visible" : "hidden",
          table_struct: <table className="table"></table>,
          search_table: <table className="table"></table>
        }, () => {
          if (this.state.delete || this.state.update || this.state.view) { this.Get_Data(); }
        });
      });
    }
    Get_Data() {  
      fetch('http://localhost:3001/read/' + this.title.toLowerCase() + 's', {
        method: "GET",
        mode: "cors", 
        headers: { "Content-Type": "application/json" },
      }).then(res => res.json())
      .then(data => {
        let row_col_vals = [];
        for (let i in data) { 
          let data_col = [];
          for (let j in data[i]) { data_col.push(<td>{data[i][j]}</td>); }
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
      }).catch(error => console.error(error));
    }
    AddData() {
      let endpoint = (this.title === "Enrollment") ? "add_enrollment" : this.title.toLowerCase();
      fetch("http://localhost:3001/create/" + endpoint, {
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
      let urls = [];
      if (this.title === "Student") { urls.push("/student_name"); }
      else if (this.title === "Instructor") { urls.push("/instructor_name"); }
      else if (this.title === "Course") { urls.push("/credits"); urls.push("/title"); }
      else if (this.title === "Section") { urls.push("/update_section_instructor"); }
      else if (this.title === "Department") { urls.push("/dept_office"); }
      else if (this.title === "Enrollment") { urls.push("/"); }
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
        let s = [];
        s.push(<p style={{ display: "inline"}}>{this.inputs[this.title][i]}:</p>)
        if (!this.state.delete) { s.push(<input className="input" type="text" placeholder={this.inputs[this.title][i]} id={this.title+this.inputs[this.title][i]}/>); }
        else { s.push(<input className="input" type="text" readOnly={true} placeholder={this.inputs[this.title][i]} id={this.title+this.inputs[this.title][i]}/>); }
        children.push(<div>{s}</div>)
      }
      children.push(<br />);
      if (this.state.add) { children.push(<button onClick={() => this.AddData()} className="button">{"Add " + this.title}</button>); }
      else if (this.state.update) { children.push(<button onClick={() => this.UpdateData()} className="button">{"Update " + this.title}</button>); }
      else if (this.state.delete) { children.push(<button onClick={() => this.DeleteData()} className="button">{"Delete " + this.title}</button>); }
      return children;
    }
    Search(type) {
      let endpoint = (type === "dept") ? "department" : "time";
      fetch("http://localhost:3001/read/sections_within_" + endpoint, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
          "start_time": document.getElementById("Searchstime").value,
          "end_time": document.getElementById("Searchetime").value,
          "dept_abbreviation": document.getElementById("Searchdept").value
        })
      }).then(res => res.json())
      .then(data => {
        let row_col_vals = [];
        for (let i in data) { 
          let data_col = [];
          for (let j in data[i]) { data_col.push(<td>{data[i][j]}</td>); }
          row_col_vals.push(<tr>{data_col}</tr>);
        }
        let cols;
        if (type === "dept") {
            cols = ["Section ID", "Course ID", "Section Number", "Year", "Semester", "Room Number", "Time Slot", "Instructor ID", "Capacity", "Course Title", "Course Number", "Department", "Time Start", "Time End", "Day ID", "Days", "Instructor First Name", "Instructor Last Name"];
        }
        else {
            cols = ["Section ID", "Course ID", "Section Number", "Year", "Semester", "Room Number", "Time Slot", "Instructor ID", "Capacity", "Time Start", "Time End", "Course Title"];
        }
        let table_cols = [];
        for (let i in cols) { table_cols.push(<td>{cols[i]}</td>); }
        let table = [
          (<table className="table">
            <thead>
              <tr>{table_cols}</tr>
            </thead>
            <tbody>{row_col_vals}</tbody>
          </table>)];
        this.setState({search_table: table});
      }).catch(error => console.error(error));
    }
    render() {
      return (
        <div className="module" id={this.title}>
          <h1>{this.title}</h1>
          <div className="options">
            <button className="button" style={{"fontWeight": (this.state.add) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("add")}>Add</button>
            <button className="button" style={{"fontWeight": (this.state.update) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("update")}>Update</button>
            <button className="button" style={{"fontWeight": (this.state.delete) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("delete")}>Delete</button>
            {(this.title === "Section") ? <button className="button" style={{"fontWeight": (this.state.search) ? "Bold" : "Normal"}} onClick={() => this.Toggle_View("search")}>Search</button> : null} 
            <button className="button" style={{"fontWeight": (this.state.view) ? "Bold" : "normal"}} onClick={() => this.Toggle_View("view")}>View All</button>
          </div>
          <div style={{ visibility: this.state.visibility, height: (this.state.visibility === "hidden") ? "0px" : "100%"}}>
            { (this.state.add) ? this.Inputs() : null }
          </div>
          <div style={{ visibility: this.state.table_vis, height: (this.state.table_vis === "hidden") ? "0px" : "100%"}}>
            {this.state.table_struct}
            <div id={this.title+" inputs"}>{ (this.state.update || this.state.delete) ? this.Inputs() : null }</div>
          </div>
          { (this.state.search) ? 
            <div style={{ visibility: (this.state.search) ? "visible" : "hidden", height: (this.state.search) ? "100%" : "0px"}}>
              <div>
                <input className="input" id="Searchdept" type="text" placeholder="Department Abbreviation"></input>
                <button className="button" onClick={() => this.Search("dept")}>Search by Dept Abbreviation</button>
              </div>
              <div>
                <input className="input" id="Searchstime" type="text" placeholder="Start Time"></input>
                <input className="input" id="Searchetime" type="text" placeholder="End Time"></input>
                <button className="button" onClick={() => this.Search("time")}>Search by Time</button>
              </div>
              {this.state.search_table}
            </div> : null
          }
        </div>
      );
    }
  }

  export default Module;