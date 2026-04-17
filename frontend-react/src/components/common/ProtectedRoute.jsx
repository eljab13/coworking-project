import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const normalizedUserRole = user?.role?.startsWith("ROLE_")
    ? user.role
    : user?.role
    ? `ROLE_${user.role}`
    : null;

  const normalizedRequiredRole = requiredRole?.startsWith("ROLE_")
    ? requiredRole
    : requiredRole
    ? `ROLE_${requiredRole}`
    : null;

  if (normalizedRequiredRole && normalizedUserRole !== normalizedRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
