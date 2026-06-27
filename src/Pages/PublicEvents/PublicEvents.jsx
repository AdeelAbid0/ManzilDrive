import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useGetPublicEvents } from "../Events/hooks/EventsApi";
import Pagination from "../../Common/Pagination";
import Loader from "../../Components/Loader/Loader";

const EventCard = ({ event, onClick }) => (
  <div
    className="flex flex-col bg-white rounded-xl border border-[#E3E8EA] overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
    onClick={onClick}
  >
    {/* Main car image */}
    <div className="w-full h-[160px] bg-[#F7F9FC] overflow-hidden">
      <img
        src={event.mainCar?.photos?.[0] || "/Car.png"}
        alt={event.name}
        className="w-full h-full object-contain p-3 hover:scale-105 transition-transform duration-300"
        onError={(e) => { e.target.src = "/Car.png"; }}
      />
    </div>

    {/* Body */}
    <div className="flex flex-col px-4 pt-3 pb-4 gap-3">
      <div>
        <h3 className="font-inter font-semibold text-sm leading-[18px] text-[#1A1A1A] line-clamp-2">
          {event.name}
        </h3>
        <p className="text-[11px] text-[#808080] mt-1">{event.business?.name}</p>
      </div>

      <div>
        <p className="font-inter font-bold text-lg text-[#1A1A1A] leading-none">
          Rs {event.pricePerPackage?.toLocaleString()}
        </p>
        <p className="font-inter text-[11px] text-[#6383A6] mt-[2px]">Complete package</p>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-[#F0F0F0]">
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-[10px] text-[#A0A0A0]">Main Car</p>
          <p className="text-[11px] font-medium text-[#4D4D4D] truncate">
            {event.mainCar?.make?.name} {event.mainCar?.variant?.name}
          </p>
        </div>
        {event.fleetCars?.length > 0 && (
          <div className="flex flex-col items-end shrink-0">
            <p className="text-[10px] text-[#A0A0A0]">Fleet</p>
            <p className="text-[11px] font-medium text-[#4D4D4D]">+{event.fleetCars.length} cars</p>
          </div>
        )}
      </div>

      <button className="w-full h-9 text-sm font-medium text-white bg-primary rounded hover:bg-[#005F4E] transition-colors duration-200">
        View Details
      </button>
    </div>
  </div>
);

const PublicEvents = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isPending: isLoading } = useGetPublicEvents(page, 12);

  const events = data?.events || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToDetail = (event) => {
    navigate(ROUTES.PUBLIC_EVENT_DETAIL.replace(":id", event._id), { state: { event } });
  };

  return (
    <div className="flex w-full flex-col min-h-screen bg-[#EDEDED]">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#001326] to-[#00417A] py-10 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="font-archivo font-bold text-3xl text-white">Event Packages</h1>
          <p className="text-white/70 text-sm mt-2">
            Book premium car packages for weddings, tours, corporate events & more
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center w-full px-4 py-8">
        <div className="w-full max-w-[1200px]">
          {isLoading ? (
            <div className="flex justify-center py-20"><Loader /></div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center py-20">
              <p className="text-[#808080] text-lg font-medium">No event packages available</p>
              <p className="text-[#A0A0A0] text-sm mt-1">Check back soon for new packages</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#808080] mb-5">{data?.total || events.length} packages available</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} onClick={() => navigateToDetail(event)} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicEvents;
