import React from "react";
import { Logo } from "../../Utils/Icons";

import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Header = ({ setLogin }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-[1440px] h-[70px] bg-[#FFFFFF]">
      <div className="flex w-[1312px]">
        <div
          className="flex items-center  w-[157px] gap-[8px] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <Logo />
          <h1 className="text-primary font-bold text-lg font-inter leading-[100%]">
            Manzil Drive
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex text-primary font-inter list-none items-center gap-8 w-[236px] ml-20">
            <li>Car Rental</li>
            <li>Events</li>
            <li>Tour</li>
          </div>
          <div className="flex items-center ml-[547px] gap-3">
            <Button
              label="Login"
              onClick={() => {
                setLogin(false);
                navigate("/login");
              }}
              className="text-primary font-inter font-medium text-sm border rounded border-primary w-[140px] h-[46px] focus:ring-0 focus:outline-none"
            />
            <Button
              label="Register"
              onClick={() => {
                setLogin(false);
                navigate("/register");
              }}
              className="text-white font-medium text-sm border rounded border-primary w-[140px] h-[46px] bg-primary focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
