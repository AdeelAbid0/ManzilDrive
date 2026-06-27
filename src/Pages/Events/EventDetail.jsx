import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "../../slices/notificationSlice";
import PrimaryButton from "../../Common/Button";
import CommonDialog from "../../Common/CommonDialog";
import { ROUTES } from "../../constants/routes";
import { Passengers, Service, AC } from "../../Utils/Icons";
import { useDeleteEvent, useToggleEventStatus } from "./hooks/EventsApi";

const STATUS_STYLES = {
  active: "bg-[#00796B1A] text-[#00796B]",
  inactive: "bg-[#F55A5A1A] text-[#F55A5A]",
  pending: "bg-[#F57C001A] text-[#F57C00]",
  rejected: "bg-[#B3261E1A] text-[#B3261E]",
};

const DetailRow = ({ label, value }) => (
  <div className="flex gap-3 py-3 border-b border-[#F0F0F0] last:border-b-0">
    <span className="text-sm text-[#808080] w-32 shrink-0">{label}</span>
    <span className="text-sm text-[#4D4D4D] font-medium flex-1">{value}</span>
  </div>
);

const MiniCarCard = ({ car }) => (
  <div className="flex flex-col border border-[#E3E8EA] rounded-xl bg-white overflow-hidden hover:shadow-sm transition-shadow duration-200">
    <div className="h-[90px] bg-[#F7F7F7] overflow-hidden">
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
        <div className="flex items-center gap-[2px]"><Service /><span className="text-[10px] text-[#6383A6] capitalize">{car.transmission === "automatic" ? "Auto" : "Manual"}</span></div>
        {car.acheater && <div className="flex items-center gap-[2px]"><AC /><span className="text-[10px] text-[#6383A6]">A/C</span></div>}
      </div>
      <p className="text-xs font-semibold text-primary mt-2">Rs {car.rentPerDay?.toLocaleString()}/day</p>
    </div>
  </div>
);

const EventDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const event = location.state?.event;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { mutate: deleteEvent, isPending: isDeleting } = useDeleteEvent();
  const { mutate: toggleStatus, isPending: isToggling } = useToggleEventStatus();

  if (!event) {
    navigate(ROUTES.EVENTS);
    return null;
  }

  const handleDelete = () => {
    deleteEvent(
      { suffixUrl: event._id },
      {
        onSuccess: () => {
          dispatch(showNotification({ message: "Event deleted successfully", status: "success" }));
          queryClient.invalidateQueries({ queryKey: ["getMyEvents"] });
          queryClient.invalidateQueries({ queryKey: ["getPublicEvents"] });
          setShowDeleteDialog(false);
          navigate(ROUTES.EVENTS);
        },
        onError: (err) => {
          dispatch(showNotification({ message: err?.message || "Delete failed", status: "error" }));
          setShowDeleteDialog(false);
        },
      },
    );
  };

  const handleToggle = () => {
    toggleStatus(
      { suffixUrl: `${event._id}/toggle-status` },
      {
        onSuccess: (res) => {
          dispatch(showNotification({ message: res?.message || "Status updated", status: "success" }));
          queryClient.invalidateQueries({ queryKey: ["getMyEvents"] });
          queryClient.invalidateQueries({ queryKey: ["getPublicEvents"] });
          navigate(ROUTES.EVENTS);
        },
        onError: (err) => {
          dispatch(showNotification({ message: err?.message || "Toggle failed", status: "error" }));
        },
      },
    );
  };

  const canToggle = event.status === "active" || event.status === "inactive";

  return (
    <div className="flex w-full flex-col gap-4 font-inter px-4 md:px-8 mt-4 mb-10">
      {/* Back */}
      <button
        onClick={() => navigate(ROUTES.EVENTS)}
        className="flex items-center gap-2 text-primary text-sm font-medium hover:underline w-fit"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#00796B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Events
      </button>

      {/* Hero Banner */}
      <div className="relative w-full h-[160px] md:h-[200px] rounded-2xl bg-gradient-to-r from-[#00796B] to-[#26A69A] overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-white/90 capitalize ${STATUS_STYLES[event.status]}`}>
              {event.status}
            </span>
          </div>
          <h1 className="text-white font-bold text-xl md:text-3xl leading-tight drop-shadow">{event.name}</h1>
          <p className="text-white/80 text-sm mt-1">Rs {event.pricePerPackage?.toLocaleString()} per package</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-4 w-full md:w-[62%]">
          {/* Event Info */}
          <div className="bg-white rounded-xl border border-[#E3E8EA] p-6">
            <h2 className="font-semibold text-base text-[#4D4D4D] mb-4">Package Details</h2>
            <div className="flex flex-col">
              <DetailRow label="Package Name" value={event.name} />
              <DetailRow label="Package Price" value={`Rs ${event.pricePerPackage?.toLocaleString()}`} />
              <DetailRow label="Total Cars" value={`${1 + (event.fleetCars?.length || 0)} cars`} />
              <DetailRow label="Status" value={<span className={`capitalize px-2 py-[2px] rounded text-xs font-medium ${STATUS_STYLES[event.status]}`}>{event.status}</span>} />
              {event.rejectionReason && (
                <DetailRow label="Rejection Reason" value={<span className="text-[#B3261E]">{event.rejectionReason}</span>} />
              )}
            </div>
          </div>

          {/* Main Car */}
          <div className="bg-white rounded-xl border border-[#E3E8EA] p-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-semibold text-base text-[#4D4D4D]">Main Car</h2>
              <span className="px-2 py-[2px] bg-[#00796B1A] text-primary text-xs font-medium rounded-full">Featured</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-[200px] h-[130px] bg-[#F7F7F7] rounded-xl overflow-hidden shrink-0">
                <img
                  src={event.mainCar?.photos?.[0] || "/Car.png"}
                  alt={event.mainCar?.make?.name}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => { e.target.src = "/Car.png"; }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#4D4D4D]">{event.mainCar?.make?.name} {event.mainCar?.model?.name}</h3>
                <p className="text-sm text-[#808080] mt-1">{event.mainCar?.variant?.name} · {event.mainCar?.year}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1"><Passengers /><span className="text-xs text-[#6383A6]">{event.mainCar?.seats} Passengers</span></div>
                  <div className="flex items-center gap-1"><Service /><span className="text-xs text-[#6383A6] capitalize">{event.mainCar?.transmission === "automatic" ? "Automatic" : "Manual"}</span></div>
                  {event.mainCar?.acheater && <div className="flex items-center gap-1"><AC /><span className="text-xs text-[#6383A6]">A/C</span></div>}
                </div>
                <p className="text-base font-bold text-primary mt-3">
                  Rs {event.mainCar?.rentPerDay?.toLocaleString()}
                  <span className="text-xs font-normal text-[#808080] ml-1">/day</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 w-full md:w-[38%]">
          {/* Stats */}
          <div className="bg-white rounded-xl border border-[#E3E8EA] p-6">
            <h2 className="font-semibold text-base text-[#4D4D4D] mb-4">Package Stats</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center py-3 bg-[#F7F7F7] rounded-lg">
                <span className="font-bold text-2xl text-[#4D4D4D]">{1 + (event.fleetCars?.length || 0)}</span>
                <span className="text-xs text-[#808080] mt-1">Total Cars</span>
              </div>
              <div className="flex flex-col items-center py-3 bg-[#F7F7F7] rounded-lg">
                <span className="font-bold text-2xl text-primary">Rs {(event.pricePerPackage / 1000).toFixed(0)}K</span>
                <span className="text-xs text-[#808080] mt-1">Price</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-[#E3E8EA] p-6 flex flex-col gap-3">
            <h2 className="font-semibold text-base text-[#4D4D4D] mb-1">Manage Package</h2>
            <PrimaryButton
              label="Edit Package"
              onClick={() => navigate(ROUTES.EDIT_EVENT.replace(":id", event._id), { state: { event } })}
            />
            {canToggle && (
              <Button
                label={isToggling ? "Updating..." : event.status === "active" ? "Mark as Inactive" : "Mark as Active"}
                disabled={isToggling}
                onClick={handleToggle}
                className={`flex justify-center items-center w-full h-[48px] border rounded hover:opacity-90 transition-colors font-medium text-sm ${
                  event.status === "active"
                    ? "border-[#F57C00] text-[#F57C00] bg-transparent hover:bg-orange-50"
                    : "border-[#00796B] text-[#00796B] bg-transparent hover:bg-green-50"
                }`}
              />
            )}
            <Button
              label="Delete Package"
              onClick={() => setShowDeleteDialog(true)}
              className="flex justify-center items-center w-full h-[48px] border border-[#F55A5A] text-[#F55A5A] bg-transparent rounded hover:bg-red-50 transition-colors font-medium text-sm"
            />
          </div>

          {/* Status info */}
          {event.status === "pending" && (
            <div className="bg-[#F57C0008] border border-[#F57C0040] rounded-xl p-4">
              <p className="text-xs text-[#F57C00] font-semibold">Pending Approval</p>
              <p className="text-xs text-[#808080] mt-1 leading-relaxed">
                Your package is awaiting admin review. Once approved, it will appear on the public events page.
              </p>
            </div>
          )}
          {event.status === "rejected" && (
            <div className="bg-[#B3261E08] border border-[#B3261E40] rounded-xl p-4">
              <p className="text-xs text-[#B3261E] font-semibold">Package Rejected</p>
              {event.rejectionReason && (
                <p className="text-xs text-[#808080] mt-1 leading-relaxed">{event.rejectionReason}</p>
              )}
              <p className="text-xs text-[#808080] mt-2">Edit the package to re-submit for approval.</p>
            </div>
          )}
        </div>
      </div>

      {/* Fleet Cars Section */}
      {event.fleetCars?.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E3E8EA] p-6">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-semibold text-base text-[#4D4D4D]">Fleet Cars</h2>
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

      {/* Delete Dialog */}
      <CommonDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        className="md:!max-w-[450px] md:!w-[30%] !w-full !max-w-full mx-1 md:mx-0"
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">Delete Package</h1>
          <p className="text-sm text-[#5D717D] mt-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#4D4D4D]">"{event.name}"</span>?
            This action cannot be undone.
          </p>
          <div className="flex gap-4 w-full justify-between mt-8">
            <Button
              label="Cancel"
              onClick={() => setShowDeleteDialog(false)}
              className="bg-transparent! border border-primary! w-full text-primary"
            />
            <PrimaryButton
              label={isDeleting ? "Deleting..." : "Delete Package"}
              loading={isDeleting}
              onClick={handleDelete}
              className="bg-red-600! hover:bg-red-700! border-red-600!"
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default EventDetail;
