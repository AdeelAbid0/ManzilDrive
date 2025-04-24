import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { CheckIcon } from "../../Utils/Icons";
import ImageUpload from "./Components/ImageUpload";
import PersonalInfo from "./Components/PersonalInfo";
const PostAdd = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [checked, setChecked] = useState(false);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <div className="flex flex-col items-center mt-2 w-[1094px] bg-white mb-8">
      <div className="flex flex-col w-[648px] mt-8">
        <h1 className="font-inter font-semibold text-[32px] text-[#4D4D4D] leading-[100%]">
          Post Your Add
        </h1>
        <p className="mt-4 font-inter font-normal text-sm text-[#666666] leading-[18px]">
          Include Some Details
        </p>
        <div className="flex flex-col mt-4">
          <Dropdown
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Select a City"
            className="font-inter items-center font-normal text-input text-sm h-[49px] bg-[#F7F7F7] rounded placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] "
          />
          <InputText
            placeholder="Rent Per Day"
            className="mt-3 font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
          />
          <InputText
            placeholder="Add Location"
            className="mt-3 font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
          />
          <InputTextarea
            autoResize={false}
            placeholder="Add Description"
            className="mt-3 font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[120px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 pt-4"
          />
        </div>
        <div className="mt-4">
          <label className="font-inter font-medium text-xs text-[#808080] leading-4">
            Driver :
          </label>
          <div className="flex gap-4">
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                With Driver
              </p>
            </div>
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                Without Driver
              </p>
            </div>
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                Both
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="font-inter font-medium text-xs text-[#808080] leading-4">
            Transmission :
          </label>
          <div className="flex gap-4">
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                Automatic
              </p>
            </div>
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                Manual
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="font-inter font-medium text-xs text-[#808080] leading-4">
            AC/Heater :
          </label>
          <div className="flex gap-4">
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                AC / Heater installed
              </p>
            </div>
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                None
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="font-inter font-medium text-xs text-[#808080] leading-4">
            Seats :
          </label>
          <div className="flex gap-4">
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                2 Person
              </p>
            </div>
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                4 Persons
              </p>
            </div>
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                7 Persons
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="font-inter font-medium text-xs text-[#808080] leading-4">
            Category :
          </label>
          <div className="flex gap-4">
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                Economy
              </p>
            </div>
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                Standard
              </p>
            </div>
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                Luxury
              </p>
            </div>
            <div className="flex gap-2 h-7 items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="w-5 h-5 rounded-sm border border-[#666666] appearance-none checked:bg-primary checked:border-none"
                />
                {checked && <CheckIcon />}
              </div>
              <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                Commercial
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 h-auto mt-6">
        <h1 className="h-[18px] font-inter font-medium text-sm text-[#666666] leading-[18px]">
          Upload upto 6 Photos
        </h1>
        <ImageUpload />
      </div>
      <div className="h-[400px] w-[648px] mt-6">
        <PersonalInfo />
      </div>
    </div>
  );
};

export default PostAdd;
