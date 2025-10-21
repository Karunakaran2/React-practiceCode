import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "100px 20px",
      }}
    >
      <h1 style={{ fontSize: "5rem", color: "#ff4d4d" }}>404</h1>
      <h2>Oops! Page Not Found 😕</h2>
      <p style={{ marginTop: "10px", color: "gray" }}>
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <button onClick={() => navigate("/")} className="btn btn-primary mt-3">
        ⬅ Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
