import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return user.role === "instructor"
    ? <Navigate to="/instructor/dashboard" />
    : <Navigate to="/student/dashboard" />;
}
