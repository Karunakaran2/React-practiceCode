import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Kranlogo from "../assets/Kran-React-Logo.svg";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
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
          <Nav.Link
            as={NavLink}
            to="/login"
            className={({ isActive }) =>
              isActive ? "active nav-link mx-2 fw-bold" : "nav-link mx-2"
            }
          >
            Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
