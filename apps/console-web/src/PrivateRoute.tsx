import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected page
  return <>{children}</>;
};

export default PrivateRoute;
