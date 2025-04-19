import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import HeroSection from "./Components/HeroSection/HeroSection";
import Products from "./Components/Products/Products";
import Footer from "./Components/Footer/Footer";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";

const App = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[1440px] bg-[#FAFAFA] h-auto">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <HeroSection />
                <Products />
                <Footer />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
