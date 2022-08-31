import React, { Fragment, useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo] = useState("");

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };

  const editTodo = (id) => {
    setIsEdit(true);
    const searchedTodo = todos.find((item) => item.id === id);
    setTodoText(searchedTodo.text);
  };

  const changeIsDone = (id) => {
    const searchTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchTodo,
      isDone: !searchTodo.isDone,
    };

    const filteredTodo = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodo]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("TodoText can't be empty");
      return;
    }
    const hasTodos = todos.find((item) => item.text === todoText);
    if (hasTodos !== undefined) {
      alert("You have the todo already");
      return;
    }
    if (isEdit === true) {
      const searchedTodo = todos.find((item) => item.id === willUpdateTodo);
      const updatedTodo = {
        ...searchedTodo,
        text: todoText,
      };
      const filteredTodos = todos.filter((item) => item.id !== willUpdateTodo);
      setTodos([...filteredTodos, updatedTodo]);
      setTodoText("");
      setIsEdit(false);
      setWillUpdateTodo("");
    } else {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text: todoText,
        date: new Date(),
      };
      setTodos([newTodo, ...todos]);
      setTodoText("");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Todo Add</h1>
      <form onSubmit={handleSubmit}>
        <div class="input-group mb-3">
          <input
            value={todoText}
            type="text"
            className="form-control"
            placeholder="Type your todo"
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button
            className={`btn btn-${isEdit === true ? "success" : "primary"}`}
            type="Submit">
            {isEdit === true ? "SAVE" : "ADD"}
          </button>
        </div>
      </form>
      {todos.length <= 0 ? (
        <p className="text-center my-5">You don't have any todos yet</p>
      ) : (
        <div className="d-flex justify-content-center ">
          <div className="col-6">
            <form className="form-inline d-flex" action="/action_page.php">
              <div className="form-group offset-md-5 ">
                <h2 className="text-center">To Do</h2>
              </div>
            </form>
            {todos.map((item) =>
              item.isDone === false ? (
                <div className="alert alert-secondary d-flex justify-content-between align-items-center">
                  <p>{item.text}</p>
                  <div>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => deleteTodo(item.id)}>
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-success mx-1"
                      onClick={() => {
                        setIsEdit(true);
                        setWillUpdateTodo(item.id);
                        setTodoText(item.text);
                      }}>
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-secondary mx-1"
                      onClick={() => changeIsDone(item.id)}>
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
          <div className="col-6">
            <form className="form-inline d-flex" action="/action_page.php">
              <div className="form-group offset-md-5 ">
                <h2 className="text-center">did</h2>
              </div>
            </form>
            {todos.map((item) =>
              item.isDone === true ? (
                <div className="alert alert-success d-flex justify-content-between align-items-center">
                  <p>{item.text}</p>
                  <div>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => deleteTodo(item.id)}>
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-secondary mx-1"
                      onClick={() => changeIsDone(item.id)}>
                      Undone
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
