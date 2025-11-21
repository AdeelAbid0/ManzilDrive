import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import AppRoutes from "../Routes/AppRoutes";

const Layout = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const token = localStorage.getItem("Token");
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const isHomePage = location.pathname === "/";
  const showSidebar = user && token && !isAuthPage && !isHomePage;

  return (
    <div className="font-inter w-full max-w-[1440px] bg-[#FAFAFA]">
      {!isAuthPage && <Header />}

      <div className="flex gap-0 w-full max-w-[1440px] min-h-[calc(100vh-70px)]">
        {showSidebar && (
          <div className="hidden h-[100vh] md:block ">
            <Sidebar />
          </div>
        )}

        <div
          className={`flex flex-col items-center w-full md::!w-[83%] h-auto pt-[70px] ${
            showSidebar && "md:ml-[242px]"
          } `}
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
