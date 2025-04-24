import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { SearchIcon } from "../../Utils/Icons";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Details from "../Details.js/Details";
const Products = () => {
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
    <div className="flex flex-col items-center w-[1440px] h-auto">
      <div className="flex items-center w-[1180px] h-[90px] rounded bg-search mt-[-45px] pl-[24px] gap-4">
        <div>
          <InputText
            placeholder="Car Make or Model"
            className="font-inter font-normal text-input text-sm w-[271px] h-[42px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
          />
          <div className="absolute mt-[-29px] ml-[240px]">
            <SearchIcon />
          </div>
        </div>
        <div>
          <Dropdown
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Select a City"
            className="font-inter items-center font-normal text-input text-sm w-[271px] h-[42px] bg-white rounded placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
          />
        </div>
        <div>
          <InputText
            placeholder="Location"
            className="font-inter font-normal text-input text-sm w-[271px] h-[42px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
          />
        </div>
        <div>
          <Button
            label="Search"
            className="text-white font-inter font-medium text-sm border rounded border-primary bg-[#22AB9B] w-[271px] h-[46px] focus:ring-0 focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="font-inter font-medium text-2xl leading-[100%] text-secondary">
          Rental Cars in Rawalpindi
        </h1>
      </div>
      <div className="flex mt-6 gap-1 " style={{ height: "auto" }}>
        <div className="flex h-[422px] w-[180px] bg-white">
          <div className="flex flex-col w-[148px] h-[390px] ml-4 mt-4">
            <h1 className="font-inter font-medium text-sm leading-[18px] text-transparent bg-clip-text bg-hero">
              Filters
            </h1>
            <div>
              <h2 className="font-inter font-semibold text-xs leading-4 mt-4 text-primaryblue">
                Shortcut
              </h2>
              <div className="flex flex-col gap-4 mt-3">
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Economy
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Luxury
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center ">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Standard
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center ">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Commercial
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-inter font-semibold text-xs leading-4 mt-6 text-primaryblue">
                Transmission
              </h2>
              <div className="flex flex-col mt-3 gap-4">
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Auto
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Manual
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-inter font-semibold text-xs leading-4 mt-6 text-primaryblue">
                Driver
              </h2>
              <div className="flex flex-col mt-3 gap-4">
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    With Driver
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Without Driver
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto w-[996px]">
          <Details />
        </div>
      </div>
    </div>
  );
};

export default Products;
