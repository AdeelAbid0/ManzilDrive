import React from "react";

const HeroSection = () => {
  return (
    <div className="w-[1440px] h-[235px] bg-hero overflow-hidden">
      <div className="flex justify-between">
        <div className="w-[373px]">
          <img className="mt-[35px]" src="Car.png" alt="CarImage" />
        </div>
        <div className="flex flex-col w-[597px] h-[88px] mt-[50px] ml-[-220px]">
          <h1 className="font-archivo text-center text-white font-semibold text-[38px] leading-[44px] tracking-[-2%]">
            Easy Car Rentals
            <br />
            Just Around the Corner
          </h1>
        </div>
        <img className="mt-[36px]" src="Car2.png" alt="CarImage" />
      </div>
    </div>
  );
};

export default HeroSection;
