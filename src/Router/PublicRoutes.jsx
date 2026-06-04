import { Suspense } from "react";
import Loader from "../Components/Loader/Loader";

const PublicRoutes = ({ children }) => {
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

export default PublicRoutes;
