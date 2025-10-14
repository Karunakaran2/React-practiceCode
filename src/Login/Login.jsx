import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const formLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid Username and Password");
    }
  };

  return (
    <div
      className="container mt-5 p-4 rounded shadow"
      style={{ maxWidth: "400px", background: "#fff" }}
    >
      <h3 className="text-center mb-3">🔐 Login</h3>
      <form onSubmit={formLogin}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-danger">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-100"
          onKeyDown={(e) => e.key === "Enter" && formLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
