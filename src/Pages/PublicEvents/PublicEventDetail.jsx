import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useGetPublicEventById } from "../Events/hooks/EventsApi";
import PrimaryButton from "../../Common/Button";
import Loader from "../../Components/Loader/Loader";
import Avatar from "../../assets/SVG/avatar.svg?react";
import ArrowLeft from "../../assets/SVG/arrow-left.svg?react";
import ArrowRight from "../../assets/SVG/arrow-right.svg?react";
import Disclaimer from "../../assets/SVG/disclaimer.svg?react";
import { Passengers, Service, AC } from "../../Utils/Icons";

const MiniCarCard = ({ car }) => (
  <div className="flex flex-col border border-[#E3E8EA] rounded-xl bg-white overflow-hidden hover:shadow-sm transition-shadow">
    <div className="h-[90px] bg-[#F7F7F7]">
      <img
        src={car.photos?.[0] || "/Car.png"}
        alt={car.make?.name}
        className="w-full h-full object-contain p-2"
        onError={(e) => { e.target.src = "/Car.png"; }}
      />
    </div>
    <div className="p-3">
      <p className="font-semibold text-xs text-[#4D4D4D] leading-tight">{car.make?.name} {car.model?.name}</p>
      <p className="text-[10px] text-[#808080] mt-[2px]">{car.variant?.name} · {car.year}</p>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-[2px]"><Passengers /><span className="text-[10px] text-[#6383A6]">{car.seats}</span></div>
        <div className="flex items-center gap-[2px]"><Service /><span className="text-[10px] text-[#6383A6]">{car.transmission === "automatic" ? "Auto" : "Manual"}</span></div>
        {car.acheater && <div className="flex items-center gap-[2px]"><AC /><span className="text-[10px] text-[#6383A6]">A/C</span></div>}
      </div>
    </div>
  </div>
);

const PublicEventDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showNumber, setShowNumber] = useState(false);

  // Use state first (from navigation), fallback to API fetch
  const stateEvent = location.state?.event;
  const { data: apiData, isFetching: isLoading } = useGetPublicEventById(stateEvent ? undefined : id);

  const event = stateEvent || apiData?.event;
  const mainCarPhotos = event?.mainCar?.photos || ["/Car.png"];

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-20"><Loader /></div>
    );
  }

  if (!event) {
    return (
      <div className="flex w-full flex-col items-center py-20">
        <p className="text-[#808080] text-base">Event not found</p>
        <button
          onClick={() => navigate(ROUTES.PUBLIC_EVENTS)}
          className="mt-4 text-primary text-sm font-medium hover:underline"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentPhotoIndex < mainCarPhotos.length - 1) setCurrentPhotoIndex((p) => p + 1);
  };
  const handlePrev = () => {
    if (currentPhotoIndex > 0) setCurrentPhotoIndex((p) => p - 1);
  };

  return (
    <div className="flex w-full flex-col gap-4 font-inter px-4 md:px-[64px] mt-4 mb-10">
      {/* Back */}
      <button
        onClick={() => navigate(ROUTES.PUBLIC_EVENTS)}
        className="flex items-center gap-2 text-primary text-sm font-medium hover:underline w-fit"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#00796B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Events
      </button>

      <div className="flex md:flex-row flex-col w-full justify-center gap-4">
        {/* Left: Photo + Details */}
        <div className="flex flex-col gap-4 w-full md:w-[63%]">
          {/* Photo slider */}
          <div className="relative bg-white rounded-[4px] overflow-hidden h-[350px] md:h-[400px]">
            <img
              src={mainCarPhotos[currentPhotoIndex]}
              alt="main car"
              className="w-full h-full object-contain"
              onError={(e) => { e.target.src = "/Car.png"; }}
            />
            {mainCarPhotos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  disabled={currentPhotoIndex === 0}
                  className="absolute top-1/2 left-1 -translate-y-1/2 w-10 h-10 bg-white rounded-[4px] shadow flex items-center justify-center disabled:opacity-40"
                >
                  <ArrowLeft />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPhotoIndex === mainCarPhotos.length - 1}
                  className="absolute top-1/2 right-1 -translate-y-1/2 w-10 h-10 bg-white rounded-[4px] shadow flex items-center justify-center disabled:opacity-40"
                >
                  <ArrowRight />
                </button>
                <span className="absolute bottom-2 right-2 bg-[#EDEDED] rounded-[20px] px-3 py-1 text-sm font-medium">
                  {currentPhotoIndex + 1}/{mainCarPhotos.length}
                </span>
              </>
            )}
          </div>

          {/* Event name & price */}
          <div className="p-6 bg-white rounded-[4px]">
            <h1 className="font-bold text-[20px] text-[#1A1A1A] leading-tight">{event.name}</h1>
            <p className="font-bold text-2xl text-primary mt-2">
              Rs {event.pricePerPackage?.toLocaleString()}
              <span className="text-[#001326] font-normal text-sm ml-2">complete package</span>
            </p>
          </div>

          {/* Package Details */}
          <div className="p-6 bg-white rounded-[4px]">
            <h2 className="font-semibold text-lg text-[#1A1A1A] mb-4">Package Details</h2>
            <div className="flex flex-col gap-0">
              <div className="flex gap-3 py-3 border-b border-[#F0F0F0]">
                <span className="text-sm text-[#808080] w-32 shrink-0">Main Car</span>
                <span className="text-sm text-[#4D4D4D] font-medium">
                  {event.mainCar?.make?.name} {event.mainCar?.model?.name} {event.mainCar?.year}
                </span>
              </div>
              <div className="flex gap-3 py-3 border-b border-[#F0F0F0]">
                <span className="text-sm text-[#808080] w-32 shrink-0">Transmission</span>
                <span className="text-sm text-[#4D4D4D] font-medium capitalize">
                  {event.mainCar?.transmission}
                </span>
              </div>
              <div className="flex gap-3 py-3 border-b border-[#F0F0F0]">
                <span className="text-sm text-[#808080] w-32 shrink-0">Seats</span>
                <span className="text-sm text-[#4D4D4D] font-medium">{event.mainCar?.seats} passengers</span>
              </div>
              <div className="flex gap-3 py-3 border-b border-[#F0F0F0]">
                <span className="text-sm text-[#808080] w-32 shrink-0">Air Conditioning</span>
                <span className="text-sm text-[#4D4D4D] font-medium">{event.mainCar?.acheater ? "Available" : "Not available"}</span>
              </div>
              <div className="flex gap-3 py-3">
                <span className="text-sm text-[#808080] w-32 shrink-0">Total Fleet</span>
                <span className="text-sm text-[#4D4D4D] font-medium">{1 + (event.fleetCars?.length || 0)} cars</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Business Info */}
        <div className="relative flex flex-col gap-4 w-full md:w-[37%]">
          <div className="flex flex-col items-center w-full px-6 py-10 bg-white rounded">
            {event.business?.img ? (
              <img src={event.business.img} className="w-16 h-16 rounded-full object-cover" alt="business" />
            ) : (
              <Avatar />
            )}
            <h1 className="text-[#001326] text-sm font-semibold leading-[100%] pt-2">
              {event.business?.name}
            </h1>
            {event.business?.shopName && (
              <p className="text-[#00132699] text-xs pt-1">{event.business.shopName}</p>
            )}
            <span className="text-[#00132699] font-normal text-sm leading-[100%] pt-4">
              Member since{" "}
              {new Date(event.business?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <div className="w-full pt-9 relative">
              {showNumber && (
                <div className="absolute z-[998] top-[-10%] left-0 bg-white flex w-full items-center p-6 flex-col border border-[#DFE8E5] rounded shadow-lg">
                  <p className="font-semibold text-[16px] text-[#444645] leading-[100%]">
                    {event.business?.name}
                  </p>
                  {event.business?.shopName && (
                    <label className="font-normal text-sm text-[#4D5151] leading-[100%] pt-2">
                      {event.business.shopName}
                    </label>
                  )}
                  <h3 className="font-bold text-[16px] text-[#444645] pt-4">
                    {event.business?.phoneNumber}
                  </h3>
                  <span className="text-xs font-normal text-[#6A706F] pt-4">
                    Mention Manzil Drive To get Better Deal
                  </span>
                  <div className="w-full pt-6">
                    <PrimaryButton label="Close" onClick={() => setShowNumber(false)} />
                  </div>
                </div>
              )}
              <PrimaryButton label="Show Phone Number" onClick={() => setShowNumber(true)} />
            </div>
          </div>

          {/* Package price card */}
          <div className="bg-white rounded p-6 flex flex-col gap-3">
            <p className="text-sm text-[#808080]">Package Price</p>
            <p className="text-2xl font-bold text-primary">Rs {event.pricePerPackage?.toLocaleString()}</p>
            <p className="text-xs text-[#808080]">Includes all {1 + (event.fleetCars?.length || 0)} cars in the package</p>
          </div>

          <img src="/Poster.png" alt="poster" className="w-full h-auto rounded" onError={() => {}} />
        </div>
      </div>

      {/* Fleet Cars */}
      {event.fleetCars?.length > 0 && (
        <div className="bg-white rounded-[4px] p-6 mt-2">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-semibold text-lg text-[#1A1A1A]">Supporting Fleet</h2>
            <span className="flex items-center justify-center w-6 h-6 bg-[#00796B1A] text-primary text-xs font-bold rounded-full">
              {event.fleetCars.length}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {event.fleetCars.map((car, i) => (
              <MiniCarCard key={car._id || i} car={car} />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-[#B3261E08] border-l-[6px] border-[#B3261E] rounded-l-[6px] mb-6">
        <div className="p-4">
          <h1 className="flex items-center gap-1 font-semibold text-[20px] text-[#B3261E]">
            <Disclaimer /> Important Disclaimer
          </h1>
          <p className="font-medium text-[16px] text-[#B3261E] pt-4">
            This platform connects customers and car owners — we do not handle transactions or verify packages. Always:
          </p>
          <ul className="list-disc font-medium text-[16px] text-[#B3261E] leading-[30px] pt-2 pl-6">
            <li>Confirm all package details directly with the business owner.</li>
            <li>Inspect all vehicles before the event day.</li>
            <li>Sign a written agreement before making any payment.</li>
            <li>Book at your own risk — Manzil Drive is not liable for any disputes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublicEventDetail;
