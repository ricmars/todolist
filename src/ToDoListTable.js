import React from "react";
import ToDoDetailsRow from "./ToDoDetailsRow";
import Settings from "./settings";

class ToDoListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  init = () => {
    this.setState({
      list: [],
    });
    fetch(Settings.API + "todos", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        this.setState({
          list: data,
        });
      })
      .catch((error) => alert("Error retrieving the data from the server"));
  };
  refresh = (event) => {
    event.preventDefault();
    this.init();
  };

  addToDo = (event) => {
    event.preventDefault();
    let item = {
      Name: `MyTodo ${this.state.list.length + 1} xxx`,
      Description: `MyTodo desc ${this.state.list.length + 1} xxx`,
      AssignedTo: "jsmith",
      DueDate: "20230405",
      IsCompleted: false,
    };
    fetch(Settings.API + "add", {
      method: "POST",
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        item.pyGUID = data;
        this.setState((state) => ({
          list: this.state.list.concat(item),
        }));
      })
      .catch((error) => alert("Error retrieving the data from the server"));
  };
  handleUpdate = (id, type, event) => {
    let tmpObj = {};
    this.setState({
      list: this.state.list.map((todo) => {
        if (todo.pyGUID === id) {
          tmpObj = todo;
          let val = event.target.value;
          if (event.target.type === "checkbox") val = `${event.target.checked}`;
          else if (event.target.type === "date") val = val.replaceAll("-", "");
          tmpObj[type] = val;
          return tmpObj;
        } else {
          return todo;
        }
      }),
    });
    fetch(Settings.API + "todo/" + id, {
      method: "POST",
      body: JSON.stringify(tmpObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
      })
      .catch((error) => alert("Error retrieving the data from the server"));
  };
  handleRemove = (id, event) => {
    event.preventDefault();
    this.setState({
      list: this.state.list.filter((todo) => todo.pyGUID !== id),
    });
    fetch(Settings.API + "todo/" + id, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
      })
      .catch((error) => alert("Error retrieving the data from the server"));
  };
  componentDidMount() {
    this.init();
  }
  render() {
    if (this.state.list && this.state.list.length > 0)
      return (
        <>
          <button onClick={this.refresh}>refresh</button>
          <table>
            <caption>List of todos - {this.state.list.length} tasks</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Assigned to</th>
                <th>Due date</th>
                <th>Is completed</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map((item) => {
                return (
                  <ToDoDetailsRow
                    key={item.pyGUID}
                    {...item}
                    updateTodo={this.handleUpdate}
                    removeTodo={this.handleRemove}
                  />
                );
              })}
            </tbody>
          </table>
          <button onClick={this.addToDo}>Add</button>
        </>
      );

    return "Loading...";
  }
}
export default ToDoListTable;
