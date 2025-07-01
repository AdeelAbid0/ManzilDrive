import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Products from "./Components/Products/Products";
import Footer from "./Components/Footer/Footer";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PostAdd from "./Pages/PostAdd/PostAdd";

const App = () => {
  const [login, setLogin] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const isHomePage = location.pathname === "/";
  const showSidebar = login && !isAuthPage && !isHomePage;

  return (
    <div className="flex justify-center">
      <div className=" w-full max-w-[1440px] bg-[#FAFAFA]">
        {!isAuthPage && <Header setLogin={setLogin} />}

        {isAuthPage ? (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setLogin={setLogin} />} />
          </Routes>
        ) : (
          <div className="flex gap-10">
            {showSidebar && <Sidebar />}

            <div className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Products />
                      <Footer />
                    </>
                  }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/postadd" element={<PostAdd />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
