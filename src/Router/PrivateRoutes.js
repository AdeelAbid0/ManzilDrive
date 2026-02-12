import { Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Components/Loader/Loader";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("Token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default PrivateRoutes;
