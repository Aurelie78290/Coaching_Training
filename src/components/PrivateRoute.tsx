import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}