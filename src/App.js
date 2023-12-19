import React, { Component } from "react";
import "./App.css";
import ToDoListTable from "./ToDoListTable";
import Settings from "./settings";

class App extends Component {
  ResetToDos = (event) => {
    event.preventDefault();
    fetch(Settings.API + "todos", {
      method: "POST",
      body: event.target.previousElementSibling.value,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Error");
        }
      })
      .catch((error) => alert("Error sending data to the server"));
    event.target.value = "";
  };
  render() {
    return (
      <>
        <h1>To-Do Application</h1>
        <div className="row-align">
          <label htmlFor="NumToDos">Number of todos</label>
          <input id="NumToDos" type="text" />
          <button onClick={this.ResetToDos}>Reset</button>
        </div>
        <ToDoListTable />
      </>
    );
  }
}
export default App;
