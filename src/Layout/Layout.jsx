import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "../Router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../Components/Footer";
import { ROUTES } from "../constants/routes";

const Layout = () => {
  const Routes = useRoutes(appRoutes);
  const token = localStorage.getItem("Token");
  const location = useLocation();

  const publicRoutes = [
    ROUTES.LANDING,
    ROUTES.LANDING_PAGE,
    ROUTES.DETAIL,
  ];

  const authRoutes = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD];

  const isAuthPage = authRoutes.includes(location.pathname);
  const isPublicPage =
    publicRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/viewAll");
  const isPrivateRoute = token && !isAuthPage && !isPublicPage;

  const [showSidebar, setShowSidebar] = useState(isPrivateRoute);

  useEffect(() => {
    setShowSidebar(isPrivateRoute);
  }, [location.pathname, isPrivateRoute]);

  const shouldShowFooter = !isAuthPage && isPublicPage;

  // Determine content width class
  const getContentWidthClass = () => {
    if (isPublicPage) return "max-w-[1440px] mx-auto ";
    if (isPrivateRoute && showSidebar) return "max-w-[1102px]";
    if (isPrivateRoute && !showSidebar) return "max-w-[1440px] mx-auto ";
    if (isAuthPage) return "max-w-[1440px] mx-auto ";
    return "max-w-[1440px] mx-auto ";
  };

  // Determine main content margin/padding
  const getMainContentClass = () => {
    let classes = "w-full";
    if (isPrivateRoute && showSidebar) {
      classes += " md:ml-64";
    }

    return classes;
  };

  return (
    <div className="min-h-screen flex w-full flex-col bg-gray-50">
      {/* Header - Fixed at top for all pages */}
      {!isAuthPage && (
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm">
          <div className="w-full">
            <Header
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              isPrivateRoute={isPrivateRoute}
              isPublicPage={isPublicPage}
            />
          </div>
        </header>
      )}

      {/* Main Content Container - Add padding top to account for fixed header */}
      <div
        className={`flex flex-1 w-full ${isAuthPage ? "" : "pt-16 md:pt-20"}`}
      >
        {/* Sidebar - Only for private routes (not public pages) */}
        {isPrivateRoute && (
          <div className="hidden md:block fixed left-0 top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] z-40">
            <Sidebar
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`flex w-full justify-center transition-all duration-300 ${getMainContentClass()}`}
        >
          <div className={`w-full ${getContentWidthClass()}`}>{Routes}</div>
        </main>
      </div>

      {/* Footer - Show only on public pages and landing page */}
      {shouldShowFooter && (
        <footer className="w-full bg-white border-t mt-auto">
          <div className="w-full">
            <Footer />
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
