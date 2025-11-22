const HeroSection = () => {
  return (
    <div className="w-full h-auto bg-hero">
      <div className="flex justify-between gap-[37px] ">
        <div className="w-[344px] md:block hidden">
          <img className="mt-[35px]" src="Car.png" alt="CarImage" />
        </div>
        <div className="flex h-auto mt-10 md:ml-0 ml-4 md:mt-8">
          <h1 className="font-archivo text-left md:text-center text-white font-semibold text-[38px] leading-[44px] tracking-[-2%]">
            Easy Car Rentals
            <br />
            Just Around the Corner
          </h1>
        </div>
        <div className="flex justify-end w-[322px">
          <img className="mt-[36px]" src="Car2.png" alt="CarImage" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
