import { Button } from "primereact/button";
import React from "react";
import { EditProfile } from "../../../Utils/Icons";
import { InputText } from "primereact/inputtext";

const PersonalInfo = () => {
  return (
    <div>
      <div className="h-[22px]">
        <h1 className="font-inter font-bold text-base leading-[22px] text-[#666666]">
          Personal Info
        </h1>
      </div>
      <div className="flex gap-6 mt-6">
        <div className="flex items-center justify-center w-[118px] h-[118px] rounded-[50%] border">
          <img
            className="rounded-[50%] object-contain"
            src="./Car.png"
            alt=""
          />
        </div>
        <div className="flex items-center">
          <Button
            label="Login"
            className="text-primary font-inter font-medium text-sm border rounded border-primary w-[160px] h-[40px] focus:ring-0 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[648px] h-[148px]">
        <div className="flex w-full justify-end">
          <EditProfile />
        </div>
        <div>
          <InputText
            placeholder="Rent Per Day"
            className="mt-3 w-full font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[50px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
          />
        </div>
        <div>
          <InputText
            placeholder="Rent Per Day"
            className="mt-3 w-full font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[50px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
          />
        </div>
        <div className="mt-2">
          <Button
            label="Post Now"
            className="text-white font-medium text-sm border rounded border-primary w-[160px] h-[40px] bg-primary focus:ring-0 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
