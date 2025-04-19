import React from "react";
import { LogoFooter } from "../../Utils/Icons";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Footer = () => {
  return (
    <div className="flex h-[272px] bg-hero gap-[110px] pt-12 mt-20">
      <div className="flex flex-col w-[280px] h-[110px] mt-12 ml-[130px] gap-4">
        <div className="flex items-center w-[157px] h-10 gap-2">
          <LogoFooter />
          <h1 className="font-inter font-bold text-lg leading-[100%] text-white">
            Manzil Drive
          </h1>
        </div>
        <div>
          <p className="font-inter font-medium text-sm text-[#D9D9D9] leading-[18px]">
            Connecting you with premium car rental services across Pakistan.
            Drive with confidence, book with ease.
          </p>
        </div>
      </div>
      <div className="flex justify-between w-[694px] h-[176px]">
        <div className="flex flex-col w-[81px] list-none gap-4">
          <li className="font-inter font-semibold text-base leading-[22px] text-[#B3B3B3]">
            Car Rental
          </li>
          <li className="font-inter font-semibold text-base leading-[22px] text-[#B3B3B3]">
            Events
          </li>
          <li className="font-inter font-semibold text-base leading-[22px] text-[#B3B3B3]">
            Tour
          </li>
          <li className="font-inter font-semibold text-base leading-[22px] text-[#B3B3B3]">
            Overseas
          </li>
          <li className="font-inter font-semibold text-base leading-[22px] text-[#B3B3B3]">
            Buy & Sell
          </li>
        </div>
        <div className="flex flex-col w-[109px] list-none gap-4">
          <li className="font-inter font-semibold text-base leading-[22px] text-[#B3B3B3]">
            Contact Us
          </li>
          <li className="font-inter font-semibold text-base leading-[22px] text-[#B3B3B3]">
            About Us
          </li>
          <li className="font-inter font-semibold text-base leading-[22px] text-[#B3B3B3]">
            Blogs
          </li>
          <li className="font-inter font-semibold text-base leading-[22px] text-[#B3B3B3]">
            Privacy Policy
          </li>
        </div>
        <div className="flex flex-col w-[344px]">
          <h1 className="font-inter font-medium text-xl leading-6 text-[#E6E6E6]">
            Subscribe To our News Letter
          </h1>
          <p className="font-inter font-medium text-xs leading-4 text-[#D9D9D9] mt-2">
            Stay updated with the latest news, tips, and exclusive offers.
            Subscribe now to never miss an update!
          </p>
          <InputText
            type="email"
            placeholder="Email"
            className="font-inter font-normal text-black text-sm w-[344px] h-[40px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 mt-4"
          />
          <Button
            label="Subscribe"
            className="text-white font-inter font-medium text-sm border rounded border-primary leading-[22px] w-[344px] h-[40px] bg-primary focus:ring-0 focus:outline-none mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
