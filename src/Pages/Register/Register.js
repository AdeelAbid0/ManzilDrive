import React from "react";
import { LogoFooter } from "../../Utils/Icons";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Register = () => {
  return (
    <div className="flex gap-[229px] h-auto bg-primary">
      <div className="flex flex-col w-[567px] ml-[100px]  pt-[200px]">
        <div className="flex items-center w-[246px] h-[64px] gap-3">
          <span>
            <LogoFooter />
          </span>
          <p className="font-inter font-bold text-[28px] leading-[100%] text-white">
            Manzil Drive
          </p>
        </div>
        <div className="mt-6">
          <p className="font-archivo font-semibold text-[56px] leading-[68px] text-white ">
            Your Trusted <br /> Partner for Effortless Car Rentals
          </p>
        </div>
        <label className="font-archivo font-medium text-2xl leading-[100%] text-white mt-4">
          – Join Us Today!
        </label>
        <div className="w-[1292px] ">
          <img src="Register.png" alt="" />
        </div>
      </div>

      <div className="flex flex-col pt-[202px] items-center w-[544px] h-auto bg-white rounded-lg z-0">
        <div className="flex w-[344px]">
          <h1 className="font-archivo font-bold text-2xl leading-[100%] text-secondary">
            Register Your Business
          </h1>
        </div>
        <InputText
          type="email"
          placeholder="Email"
          className="font-inter font-normal text-black text-sm w-[344px] h-[54px] rounded focus:ring-0 focus:outline-none placeholder-[#B1B0B0] placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 mt-4 bg-[#F7F7F7]"
        />
        <InputText
          type="text"
          placeholder="Password"
          className="font-inter font-normal text-black text-sm w-[344px] h-[54px] rounded focus:ring-0 focus:outline-none placeholder-[#B1B0B0] placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 mt-4 bg-[#F7F7F7]"
        />
        <InputText
          type="number"
          placeholder="Phone Number"
          className="font-inter font-normal text-black text-sm w-[344px] h-[54px] rounded focus:ring-0 focus:outline-none placeholder-[#B1B0B0] placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 mt-4 bg-[#F7F7F7]"
        />
        <InputText
          type="text"
          placeholder="Shop Name"
          className="font-inter font-normal text-black text-sm w-[344px] h-[54px] rounded focus:ring-0 focus:outline-none placeholder-[#B1B0B0] placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 mt-4 bg-[#F7F7F7]"
        />
        <InputText
          type="text"
          placeholder="Address"
          className="font-inter font-normal text-black text-sm w-[344px] h-[54px] rounded focus:ring-0 focus:outline-none placeholder-[#B1B0B0] placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 mt-4 bg-[#F7F7F7]"
        />
        <Button
          label="Register"
          className="text-white font-inter font-medium text-sm border rounded border-primary leading-[22px] w-[344px] h-[48px] bg-primary focus:ring-0 focus:outline-none mt-4"
        />
        <div className="flex items-center gap-[6px] mt-4 w-[344px]">
          <p className="font-inter font-normal text-xs leading-4 text-[#174473]">
            Do not have an account ?
          </p>
          <p className="font-inter font-semibold text-xs leading-4 underline underline-offset-2 text-primary">
            Create an Account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
