import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Kranlogo from "../assets/Kran-React-Logo.svg";
import { AppContext } from "../Context/AppContext";

function AppNavbar() {
  const { theme, toggleTheme, user, logout } = useContext(AppContext);

  return (
    <Navbar
      style={{
        backgroundColor: theme === "light" ? "#f2f2f2" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
      expand="lg"
      className={`px-4 ${theme === "light" ? "navbar-light" : "navbar-dark"}`}
    >
      <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
        <img src={Kranlogo} alt="Kran Logo" height="40" className="kran-logo" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            as={NavLink}
            to="/"
            className={({ isActive }) =>
              isActive ? "active nav-link mx-2 fw-bold" : "nav-link mx-2"
            }
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/todoapp"
            className={({ isActive }) =>
              isActive ? "active nav-link mx-2 fw-bold" : "nav-link mx-2"
            }
          >
            TodoApp
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "active nav-link mx-2 fw-bold" : "nav-link mx-2"
            }
          >
            Transactions
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/notesapp"
            className={({ isActive }) =>
              isActive ? "active nav-link mx-2 fw-bold" : "nav-link mx-2"
            }
          >
            Notes App
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/weatherApp"
            className={({ isActive }) =>
              isActive ? "active nav-link mx-2 fw-bold" : "nav-link mx-2"
            }
          >
            Weather
          </Nav.Link>
          {user ? (
            <button className="btn bg-danger me-1" onClick={logout}>
              {" "}
              Logout
            </button>
          ) : (
            <Nav.Link
              as={NavLink}
              to="/login"
              className={({ isActive }) =>
                isActive ? "active nav-link mx-2 fw-bold" : "nav-link mx-2"
              }
            >
              Login
            </Nav.Link>
          )}
        </Nav>
        <Button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
