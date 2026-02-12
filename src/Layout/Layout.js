import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "../Router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../Components/Footer/Footer";

const Layout = () => {
  const Routes = useRoutes(appRoutes);
  const user = JSON.parse(localStorage.getItem("User"));
  const token = localStorage.getItem("Token");
  const location = useLocation();

  // Public routes that should NOT show sidebar and SHOULD show footer
  const publicRoutes = [
    "/",
    "/landing-page",
    "/detail",
    "/about",
    "/contact",
    "/pricing",
    "/features",
  ];

  // Auth routes (no sidebar, no footer)
  const authRoutes = ["/login", "/register", "/forgot-password"];

  const isAuthPage = authRoutes.includes(location.pathname);
  const isPublicPage =
    publicRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/viewAll");
  const isPrivateRoute = token && !isAuthPage && !isPublicPage;

  const [showSidebar, setShowSidebar] = useState(isPrivateRoute);

  useEffect(() => {
    setShowSidebar(isPrivateRoute);
  }, [location.pathname, isPrivateRoute]);

  // Determine if footer should be shown
  const shouldShowFooter = () => {
    if (isAuthPage) return false;
    if (isPublicPage) return true;
    if (isPrivateRoute) return false;
    return false;
  };

  // Determine content width class
  const getContentWidthClass = () => {
    if (isPublicPage) return "max-w-[1440px] mx-auto ";
    if (isPrivateRoute && showSidebar) return "max-w-[1440px] w-full ";
    if (isPrivateRoute && !showSidebar) return "max-w-[1440px] mx-auto ";
    if (isAuthPage) return "max-w-[1440px] mx-auto ";
    return "max-w-[1440px] mx-auto ";
  };

  // Determine main content margin/padding
  const getMainContentClass = () => {
    // Base padding for all pages
    let classes = "w-full";

    // Add top padding/margin to account for fixed header

    // Add left margin for private routes with sidebar
    if (isPrivateRoute && showSidebar) {
      classes += " md:ml-64";
    }

    return classes;
  };

  return (
    <div className="min-h-screen flex w-full flex-col bg-gray-50">
      {/* Header - Fixed at top for all pages */}
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

      {/* Main Content Container - Add padding top to account for fixed header */}
      <div className="flex flex-1 w-full pt-16 md:pt-20">
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
      {shouldShowFooter() && (
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
