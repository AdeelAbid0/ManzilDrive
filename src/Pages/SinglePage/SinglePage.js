import { ReactComponent as LocationIcon } from "../../assets/SVG/location.svg";
import { ReactComponent as Avatar } from "../../assets/SVG/avatar.svg";
import { ReactComponent as Disclaimer } from "../../assets/SVG/disclaimer.svg";
import { ReactComponent as ArrowLeft } from "../../assets/SVG/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/SVG/arrow-right.svg";
import { ReactComponent as CameraIcon } from "../../assets/SVG/camera.svg";
import PrimaryButton from "../../Common/Button/Button";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const SinglePage = () => {
  const navigate = useNavigate();
  const [showNumber, setShowNumber] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const location = useLocation();
  const carDetail = location.state;
  const handleNext = () => {
    if (currentIndex < carDetail?.photos?.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  return (
    <div className="flex w-full flex-col gap-4 font-inter px-4 md:px-[64px] mt-4">
      <div className="flex md:flex-row flex-col w-full justify-center gap-4">
        <div className="flex flex-col gap-1 md:gap-4 w-full md:w-[63%] ">
          <div className="relative">
            <img
              src={carDetail?.photos[currentIndex]}
              alt="car"
              className="w-full object-cover max-h-[400px] rounded-[4px]"
            />
            <span
              className="absolute top-1/2 left-1  cursor-pointer flex justify-center items-center w-10 h-10 bg-white rounded-[4px] shadow-[0px_0px_4px_0px_#00000026]"
              onClick={handlePrevious}
            >
              <ArrowLeft />
            </span>
            <span
              className="absolute top-1/2 right-1 cursor-pointer flex justify-center items-center w-10 h-10 bg-white rounded-[4px]  shadow-[0_0_4px_0_#00000026]"
              onClick={handleNext}
            >
              <ArrowRight />
            </span>
            <span className="absolute bottom-1 right-1  bg-[#EDEDED] rounded-[20px] flex justify-center items-center px-[10px] py-[7px] gap-[10px] text-gradient">
              <CameraIcon />
              <span className="text-sm font-medium">
                {currentIndex + 1}/{carDetail?.photos?.length}
              </span>
            </span>
          </div>
          <div className="p-6 bg-white rounded-tl-[4px] rounded-tr-[4px]">
            <h1 className="font-bold text-[20px] text-[#1A1A1A] leading-6">
              {`RS ${carDetail?.rentPerDay}`}
              <span className="text-[#001326] font-normal text-sm ml-2">
                per/day
              </span>
            </h1>
            <h2 className="font-semibold text-sm md:text-[16px] text-[#4D4D4D] pt-3 md:pt-2">
              {carDetail?.make?.name}&nbsp;
              {carDetail?.model?.name}&nbsp;
              {carDetail?.variant?.name}
            </h2>
            <div className="flex items-start gap-2 pt-3">
              <LocationIcon />
              <p className="text-sm font-normal text-[#666666]">
                {carDetail?.business?.location?.address}
              </p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-tl-[4px] rounded-tr-[4px]">
            <h1 className="font-semibold md:font-bold text-[18px] leading-6 md:text-[20px] text-[#1A1A1A]">
              Details
            </h1>
            <div className="flex justify-between mt-6 gap-8">
              <div className="w-full max-w-[40%] font-normal text-[#4D4D4D] text-sm leading-[27px]">
                <p>
                  {carDetail?.make?.name}&nbsp;
                  {carDetail?.model?.name}&nbsp;
                  {carDetail?.variant?.name}
                </p>
                <p>Year: {carDetail?.year}</p>
                <p>Mileage: 18 km/l (city) | 22 km/l (highway)</p>
                <p>
                  Transmission:
                  {carDetail?.transmission === "automatic"
                    ? "Automatic"
                    : "Manual"}
                </p>
                <p>Seating Capacity: {carDetail?.seats}</p>
                <p>Color: Silver</p>
                <p>
                  {carDetail?.acheater
                    ? "Air Conditioning (available)"
                    : "Air Conditioning (Not available)"}
                </p>
                <p>Steering: Power-assisted, tilt-adjustable</p>
              </div>
              <div className="w-full max-w-[40%] text-[#4D4D4D] text-sm leading-[27px]">
                <p>
                  Safety: ABS with EBD, Dual Front Airbags, Reverse Parking
                  Sensors
                </p>
                <p>
                  Comfort: Fabric Upholstery, Adjustable Headrests, Rear Seat
                  Foldable
                </p>
                <p>Lighting: Halogen Headlamps, LED Daytime Running Lights</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-4 w-full md:w-[37%]">
          <div className="flex flex-col items-center w-full px-6 py-11 md:py-14 bg-white rounded">
            <Avatar />
            <h1 className="!m-0 text-[#001326] text-sm font-semibold leading-[100%] pt-2">
              {carDetail?.business?.name}
            </h1>
            <span className="text-[#00132699] font-normal text-sm leading-[100%] pt-4">
              Member since <span> </span>
              {new Date(carDetail?.business?.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  year: "numeric",
                },
              )}
            </span>
            <p className="text-[#666666] font-medium text-sm pt-4">
              {carDetail?.business?.location?.address} Bug here : Not showing
              location
            </p>
            <span
              className="pt-4 text-[#00796B] text-[16px] font-medium underline underline-offset-2 cursor-pointer"
              onClick={() => {
                navigate(`/viewAll/${carDetail?.business?._id}`, {
                  state: carDetail,
                });
              }}
            >
              View All Cars
            </span>
            <div className="w-full pt-9">
              {showNumber && (
                <div className="absolute z-[998] top-[30%] left-0 bg-white flex w-full items-center p-6 flex-col border border-[#DFE8E5] rounded [box-shadow:0px_1px_3px_0px_#00796B4D,0px_4px_8px_3px_#00796B26]">
                  <p className="font-semibold text-[16px] text-[#444645] leading-[100%]">
                    {carDetail?.business?.name}
                  </p>
                  <label className="font-normal text-sm text-[#4D5151] leading-[100%] pt-2">
                    {carDetail?.business?.shopName}
                  </label>
                  <h3 className="font-bold text-[16px] text-[#444645] pt-4">
                    {carDetail?.business?.phoneNumber}
                  </h3>
                  <span className="text-xs font-normal text-[#6A706F] pt-4">
                    Mention Manzil Drive To get Better Deal
                  </span>
                  <div className="w-full pt-6">
                    <PrimaryButton
                      type="primary"
                      label="Close"
                      className="font-medium text-sm"
                      onClick={() => {
                        setShowNumber(false);
                      }}
                    />
                  </div>
                </div>
              )}
              <PrimaryButton
                type="primary"
                label="Show Phone number"
                className="font-medium text-sm"
                onClick={() => {
                  setShowNumber(true);
                }}
              />
            </div>
          </div>
          <div className="white rounded">
            <img src="/Poster.png" alt="poster" />
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-[#B3261E08] border-l-[6px] border-[#B3261E] rounded-l-[6px] mb-6">
        <div className="p-4">
          <h1 className="flex items-center gap-1 font-semibold text-[20px] text-[#B3261E]">
            <span>
              <Disclaimer />
            </span>
            Important Disclaimer
          </h1>
          <p className="font-medium text-[16px] text-[#B3261E] pt-4">
            This platform connects renters and car owners—we do not handle
            transactions or verify vehicle/document authenticity. Always:
          </p>
          <ul className="list-disc font-medium text-[16px] text-[#B3261E] leading-[30px] pt-2 pl-6">
            <li>
              Inspect the car and check all documents (insurance, registration,
              etc.).
            </li>
            <li>Carry your ID/license and sign a rental agreement.</li>
            <li>
              Use caution—we’re not liable for accidents, damages, or disputes.
            </li>
            <li>
              Rent at your own risk. (Place near booking actions for
              visibility.)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
