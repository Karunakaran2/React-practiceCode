import React, { useEffect, useState, useRef, useReducer } from "react";
import { Button } from "react-bootstrap";
import { todoReducer } from "../Reducers/todoReducer";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, dispatch] = useReducer(todoReducer, []);

  const isFirstRender = useRef(true);

  const addtask = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      alert("Enter A Task");
      return;
    }
    dispatch({ type: "ADD_TODO", payload: task });
    setTask("");
  };

  console.log(todos);

  useEffect(() => {
    const savetodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savetodos) dispatch({ type: "SET_TODOS", payload: savetodos });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incompleted") return !todo.completed;
    return true;
  });

  return (
    <div className="todo-app container mt-5 w-50">
      <h1 className="text-center mb-4">✅ Premium To-Do List</h1>

      <div className="">
        <form onSubmit={addtask} className="d-flex gap-2 mb-3">
          <input
            className="form-control"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addtask(e)}
          />
          <button className="btn btn-primary">Add</button>
        </form>
      </div>

      <p className="text-center mt-3 fw-semibold">
        Total: {todos.length} | Completed:{" "}
        {todos.filter((t) => t.completed).length} | Incomplete:{" "}
        {todos.filter((t) => !t.completed).length}
      </p>

      <div className="d-flex justify-content-center gap-2 my-3">
        <button
          className={`btn ${
            filter === "all" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn ${
            filter === "completed" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`btn ${
            filter === "incompleted" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setFilter("incompleted")}
        >
          Incomplete
        </button>
      </div>

      <ul className="list-unstyled mt-3">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item d-flex justify-content-between align-items-center p-2 px-3 mb-2 ${
              todo.completed ? "bg-light text-muted" : "bg-white"
            } shadow-sm rounded`}
          >
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={todo.completed}
                onClick={() =>
                  dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                }
                // onChange={() => onToggle(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: todo.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
