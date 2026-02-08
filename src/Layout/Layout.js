import { matchPath, useLocation } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import AppRoutes from "../Routes/AppRoutes";
import { useEffect, useState } from "react";
import { PublicRoutes } from "../Routes/PublicRoutes";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const token = localStorage.getItem("Token");
  const location = useLocation();
  const isAuthPage =
    location.pathname.startsWith("/auth") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forget-password";
  const isHomePage = location.pathname === "/";
  const routes = PublicRoutes;
  const [showSidebar, setShowSidebar] = useState(
    user && token && !isAuthPage && !isHomePage,
  );
  useEffect(() => {
    const routeCheck = routes.find((route) =>
      matchPath({ path: route.path, end: true }, location.pathname),
    );
    if (routeCheck && (!user || !token)) {
      setShowSidebar(false);
    } else if (user && token && !isAuthPage && !isHomePage) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [location, user, token, isAuthPage, isHomePage]);
  return (
    <div className="font-inter w-full  bg-[#FAFAFA]">
      {!isAuthPage && location.pathname !== "/" && <Header />}
      {location.pathname === "/" && <Header />}

      <div className="flex gap-0 w-full justify-center min-h-[calc(100vh-70px)]">
        {showSidebar && (
          <div className="hidden h-[100vh] md:block ">
            <Sidebar />
          </div>
        )}

        <div
          className={`flex flex- max-w-[1440px] items-center justify-center w-full h-auto ${
            isAuthPage ? "mt-0" : "mt-[72px]"
          }  ${showSidebar && "md:ml-[242px]"} `}
        >
          <AppRoutes user={user} />
        </div>
      </div>

      {(location.pathname === "/" || location.pathname === "/detail") && (
        <Footer />
      )}
    </div>
  );
};

export default Layout;
