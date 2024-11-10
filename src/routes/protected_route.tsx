import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser, getUserRole, isAuthenticated } from "../services/authService";
import { CommonComponentProps } from "../lib/props";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ProtectedRouteProps extends CommonComponentProps { }

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const user = getCurrentUser();
  // return user ? children : <Navigate to="/login" />

  const auth = isAuthenticated();
  return auth ? children : <Navigate to="/login" />
}

export const ProtectedManagerRoute = ({ children }: ProtectedRouteProps) => {
  const role = getUserRole();
  const auth = isAuthenticated();
  const location = useLocation();

  useEffect(() => {
    if (!auth || role !== "Manager" || role !== "Admin") {
      toast.error("You are not allowed to access this page.");
    }
  }, [auth, role]);

  return auth && (role === "Manager" || role === "Admin") ? (
    children
  ) : (
    <Navigate to={"/login"} replace state={{ error: "You are not allowed to access this page" }} />
  );
};

export const ProtectedAdminRoute = ({ children }: ProtectedRouteProps) => {
  const role = getUserRole();
  const auth = isAuthenticated();
  const location = useLocation();

  // useEffect(() => {
  //   if (!auth || role !== "Admin") {
  //     toast.error("You are not allowed to access this page.");
  //   }
  // }, [auth, role]);

  return auth && role === "Admin" ? (
    children
  ) : (
    <Navigate to={"/login"} replace state={{ error: "You are not allowed to access this page" }} />
  );
};