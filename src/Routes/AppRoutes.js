import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

const AppRoutes = ({ user }) => {
  return (
    <Routes>
      {/* Public Routes */}
      {PublicRoutes.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={
            route.path === "/" && user ? (
              <Navigate to="/landing-page" replace /> // Logged-in users go to dashboard
            ) : (
              <route.component />
            )
          }
        />
      ))}

      {/* Private Routes - Directly check user here */}
      {PrivateRoutes.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={
            user ? (
              <route.component /> // Allow if logged in
            ) : (
              <Navigate to="/login" replace /> // Redirect to login if not
            )
          }
        />
      ))}

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
