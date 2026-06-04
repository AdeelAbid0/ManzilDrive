import { Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Components/Loader/Loader";
import { ROUTES } from "../constants/routes";

const PageLoader = () => (
  <div className="flex flex-col justify-center items-center h-screen gap-3">
    <Loader />
    <p className="text-primary font-inter font-medium text-sm">Loading...</p>
  </div>
);

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("Token");
  const location = useLocation();

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

export default PrivateRoutes;
