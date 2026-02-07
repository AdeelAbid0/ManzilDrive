import { LogoFooter } from "../../Utils/Icons";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Footer = () => {
  return (
    <div className="flex justify-center w-full bg-hero">
      <div className="flex w-full md:flex-row flex-col min-h-[272px] md:justify-between h-auto gap-[8%] pt-8 md:pt-12 max-w-[91.11%]">
        <div className="flex flex-col md:w-[19.44%]  h-[110px]  gap-4 mb-8">
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
        <div className="flex md:flex-row flex-col justify-between w-[48.19%] min-w-[344px]  h-auto lg-gap-0 md:gap-6 gap-8 mb-12">
          <div className="flex md:ml-0 ml-4 md:gap-6 gap-16">
            <div className="flex flex-col w-[11.67%] min-w-[81px] list-none gap-4">
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
            <div className="flex flex-col w-[15.7%] min-w-[109px] list-none gap-4">
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
          </div>
          <div className="flex flex-col md:w-[49.5%] w-full h-auto md:ml-0 ml-4">
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
              className="font-inter font-normal text-input text-sm w-[96%] h-[40px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 mr-4 mt-4"
            />
            <Button
              label="Subscribe"
              className="text-white font-inter font-medium text-sm border rounded border-primary leading-[22px] w-[96%] h-[40px] bg-primary focus:ring-0 focus:outline-none mt-4 mr-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
