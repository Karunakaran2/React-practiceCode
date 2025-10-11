import { useState } from "react";
import "./App.css";
import AppNavbar from "./Header/AppNavbar";
import Home from "./Layout/Home";
import Login from "./Login/Login";
import { Route, Routes } from "react-router-dom";
import Transactions from "./Layout/Transactions";
import TodoApp from "./Layout/TodoApp";
import NotesApp from "./Layout/NotesApp";
import Weather from "./Layout/Weather";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todoapp" element={<TodoApp />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/notesapp" element={<NotesApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/weatherApp" element={<Weather />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
