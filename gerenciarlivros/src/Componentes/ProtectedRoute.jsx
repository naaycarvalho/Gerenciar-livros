import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ProtectedRoute = ({ allowedRoles = null }) => {
  const { perfil, isAuthenticated, checkAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    verifyAuth();
  }, []);
  
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles === null) return <Outlet />;

  const normalizedAllowedRoles = Array.isArray(allowedRoles)
    ? allowedRoles.map((role) => role.trim().toLowerCase())
    : [allowedRoles.trim().toLowerCase()];

  if (!normalizedAllowedRoles.includes(perfil)) {
    return <Navigate to="/semautorizacao" replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default ProtectedRoute;
