import React, { useState } from "react";
import { Hambergur, Logo } from "../../Utils/Icons";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("User"));
  return (
    <div className="flex justify-center items-center w-full max-w-[1440px] h-[70px] bg-white fixed z-[999]">
      <div className="flex w-[91.11%] max-w-[1312px] md:gap-10 lg:gap-20">
        <div
          className="flex items-center  w-[11.96%] min-w-[156px] gap-[8px] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <Logo />
          <h1 className="text-primary font-bold text-lg font-inter leading-[100%]">
            Manzil Drive
          </h1>
        </div>
        <div className="hidden md:flex justify-between w-[81.9%]">
          <div className="flex text-primary font-inter list-none items-center gap-8 min-w-[236px] w-[21.95%]">
            <li>Car Rental</li>
            <li>Events</li>
            <li>Tour</li>
          </div>
          <div className="flex items-center gap-3">
            <Button
              label={user ? "Logout" : "Login"}
              onClick={() => {
                if (user) {
                  localStorage.removeItem("User");
                  localStorage.removeItem("Token");
                  navigate("/");
                } else {
                  navigate("/login");
                }
              }}
              className="text-primary font-inter font-medium text-sm border rounded border-primary w-[140px] h-[46px]"
            />
            {!user && (
              <Button
                label="Register"
                onClick={() => {
                  navigate("/register");
                }}
                className="text-white font-medium text-sm border rounded border-primary w-[140px] h-[46px] bg-primary"
              />
            )}
          </div>
        </div>
        <div
          className="flex w-full justify-end md:hidden cursor-pointer"
          onClick={() => {
            setMenu(true);
          }}
        >
          <Hambergur />
        </div>
      </div>
      {menu && (
        <Sidebar
          showCloseIcon={false}
          visible={menu}
          onHide={() => setMenu(false)}
          className="w-[200px]"
        >
          <div>
            <ul className="flex flex-col gap-8 list-none text-primary font-inter ">
              <li>Car Rental</li>
              <li>Events</li>
              <li>Tour</li>
            </ul>
          </div>
        </Sidebar>
      )}
    </div>
  );
};

export default Header;
