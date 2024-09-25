import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { CommonComponentProps } from "../lib/props";

interface ProtectedRouteProps extends CommonComponentProps { }

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />
}