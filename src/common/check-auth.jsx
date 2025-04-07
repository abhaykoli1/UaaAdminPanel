import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isLoggedIn, children }) {
  const location = useLocation();
  const isAuthenticated = isLoggedIn === "true"; // Ensure it's a boolean

  // If user is trying to access the login page and is already logged in, redirect to admin dashboard
  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  // If user is not logged in and trying to access a protected route, redirect to login
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
