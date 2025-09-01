import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Routes/AppRoutes";
import NotificationProvider from "./Components/Notification/Notification";

const App = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User"));
  const location = useLocation();

  // Remove automatic navigation - let routes handle this
  const isAuthPage = location.pathname.startsWith("/auth");
  const isHomePage = location.pathname === "/";
  const showSidebar = user && !isAuthPage && !isHomePage;

  return (
    <div className="flex justify-center">
      <NotificationProvider />
      <div className="w-full max-w-[1440px] bg-[#FAFAFA]">
        {!isAuthPage && <Header />}

        <div className="flex gap-0 w-full max-w-[1440px] min-h-[calc(100vh-70px)]">
          {showSidebar && (
            <div className="hidden md:block md:w-[17%]">
              <Sidebar />
            </div>
          )}

          <div className="flex flex-col w-full h-auto pt-[70px]">
            <AppRoutes user={user} />
          </div>
        </div>

        {(location.pathname === "/" || location.pathname === "/detail") && (
          <Footer />
        )}
      </div>
    </div>
  );
};

export default App;
