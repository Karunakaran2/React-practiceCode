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
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

import styled, {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import PrivateRoute from "./Login/PrivateRoute";

const lightTheme = {
  background: "#f2f2f2",
  cardBg: "#ffffff",
  text: "#000",
  buttonBg: "#007bff",
};

const darkTheme = {
  background: "#121212",
  cardBg: "#1e1e1e",
  text: "red",
  buttonBg: "#ff9800",
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
    margin: 0;
  }
`;

function App() {
  const { theme } = useContext(AppContext);
  return (
    <>
      <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <AppNavbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/todoapp"
              element={
                <PrivateRoute>
                  <TodoApp />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              }
            />
            <Route path="/notesapp" element={<NotesApp />} />
            <Route path="/weatherApp" element={<Weather />} />
          </Routes>
        </div>
      </StyledThemeProvider>
    </>
  );
}

export default App;
