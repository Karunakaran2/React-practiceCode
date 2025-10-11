import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const isFirstRender = useRef(true);

  const addtask = () => {
    if (task.trim() === "") {
      alert("Enter A Task");
      return;
    }
    const newTask = { id: Date.now(), text: task, completed: false };
    setTodos([...todos, newTask]);
    setTask("");
  };

  useEffect(() => {
    const savetodos = JSON.parse(localStorage.getItem("todos"));
    if (savetodos) setTodos(savetodos);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const onDelete = (id) => {
    const newvalue = todos.filter((todo) => todo.id !== id);
    setTodos(newvalue);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incompleted") return !todo.completed;
    return true;
  });

  return (
    <div className="todo-app container mt-5 w-50">
      <h1 className="text-center mb-4">✅ Premium To-Do List</h1>

      <div className="input-section d-flex gap-2">
        <input
          type="text"
          placeholder="Enter your task"
          className="form-control"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addtask()}
        />
        <button className="btn btn-primary" onClick={addtask}>
          Add
        </button>
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
                onChange={() => onToggle(todo.id)}
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
              onClick={() => onDelete(todo.id)}
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
