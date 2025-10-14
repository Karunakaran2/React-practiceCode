import React, { createContext, useEffect, useRef, useState } from "react";

// context
export const AppContext = createContext();

// provider
export const AppContextProvider = ({ children }) => {
  const isFirstRender = useRef(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const login = (username, password) => {
    const validName = "karan";
    const validPass = "12345";

    if (username === validName && password === validPass) {
      const userData = { name: username };
      setUser(userData);
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme, user, login, logout };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
