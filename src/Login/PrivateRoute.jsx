import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;
