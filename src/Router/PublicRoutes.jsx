import { Suspense } from "react";
import Loader from "../Components/Loader/Loader";

const PageLoader = () => (
  <div className="flex flex-col justify-center items-center h-screen gap-3">
    <Loader />
    <p className="text-primary font-inter font-medium text-sm">Loading...</p>
  </div>
);

const PublicRoutes = ({ children }) => {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

export default PublicRoutes;
