import { useState, useRef, useMemo, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "../../constants/routes";
import { DailyBooking, ActiveAds, ExpireAds } from "../../Utils/Icons";
import { showNotification } from "../../slices/notificationSlice";
import PrimaryButton from "../../Common/Button";
import CommonDialog from "../../Common/CommonDialog";
import Pagination from "../../Common/Pagination";
import Loader from "../../Components/Loader/Loader";
import ArrowDownIcon from "../../assets/SVG/arrow-down.svg?react";
import { useGetMyEvents, useDeleteEvent, useToggleEventStatus } from "./hooks/EventsApi";
import "./Events.css";

const EVENT_TABS = [
  { label: "View All", key: "all" },
  { label: "Active", key: "active" },
  { label: "Pending", key: "pending" },
  { label: "Inactive", key: "inactive" },
];

const STATUS_STYLES = {
  active: "bg-[#00796B1A] text-[#00796B]",
  inactive: "bg-[#F55A5A1A] text-[#F55A5A]",
  pending: "bg-[#F57C001A] text-[#F57C00]",
  rejected: "bg-[#B3261E1A] text-[#B3261E]",
};

const LIMIT = 10;

const EventCard = ({ event, onView, onEdit, onDelete }) => (
  <div className="flex flex-col bg-white rounded-lg border border-[#E3E8EA] overflow-hidden">
    <div className="w-full h-[120px] bg-[#F7F9FC]">
      <img
        className="w-full h-full object-contain p-2"
        src={event.mainCar?.photos?.[0]}
        alt={event.name}
        onError={(e) => { e.target.src = "/Car.png"; }}
      />
    </div>
    <div className="flex flex-col px-3 pt-3 pb-3 gap-2">
      <div className="flex items-start justify-between gap-1">
        <h1 className="font-inter font-semibold text-[13px] leading-[18px] text-secondary line-clamp-2 flex-1">
          {event.name}
        </h1>
        <span className={`inline-flex shrink-0 px-[6px] py-[2px] rounded-[4px] text-[10px] font-medium capitalize ml-1 ${STATUS_STYLES[event.status] || "bg-gray-100 text-gray-500"}`}>
          {event.status}
        </span>
      </div>
      <div>
        <p className="font-inter font-bold text-base text-secondary leading-none">
          Rs {event.pricePerPackage?.toLocaleString()}
        </p>
        <p className="font-inter text-[11px] text-[#6383A6] mt-[2px]">Per package</p>
      </div>
      <div className="flex items-center gap-2 pt-1 border-t border-[#F0F0F0]">
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-[10px] text-[#A0A0A0]">Main Car</p>
          <p className="text-[11px] font-medium text-primarygrey truncate">
            {event.mainCar?.make?.name} {event.mainCar?.variant?.name}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <p className="text-[10px] text-[#A0A0A0]">Fleet</p>
          <p className="text-[11px] font-medium text-primarygrey">
            +{event.fleetCars?.length || 0} cars
          </p>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button onClick={onView} label="View" className="flex justify-center text-primary font-inter font-medium text-xs border rounded border-primary flex-1 h-8 focus:ring-0 focus:outline-none" />
        <Button onClick={onEdit} label="Edit" className="flex justify-center text-primary font-inter font-medium text-xs border rounded border-primary flex-1 h-8 focus:ring-0 focus:outline-none" />
        <Button onClick={onDelete} label="Delete" className="flex justify-center text-[#F55A5A] font-inter font-medium text-xs border rounded border-[#F55A5A] flex-1 h-8 focus:ring-0 focus:outline-none" />
      </div>
    </div>
  </div>
);

const Events = () => {
  const op = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTabDropdown, setShowTabDropdown] = useState(false);
  const [selectedTabLabel, setSelectedTabLabel] = useState("View All");
  const [page, setPage] = useState(1);

  const { data: eventsData, isPending: isLoading } = useGetMyEvents(page, LIMIT, activeTab);
  const { mutate: deleteEvent, isPending: isDeleting } = useDeleteEvent();
  const { mutate: toggleStatus } = useToggleEventStatus();

  const events = eventsData?.events || [];
  const totalPages = eventsData?.totalPages || 1;
  const stats = eventsData?.stats || { total: 0, active: 0, inactive: 0, pending: 0 };

  const statsCards = useMemo(
    () => [
      { icon: DailyBooking, label: "TOTAL PACKAGES", value: stats.total },
      { icon: ActiveAds, label: "ACTIVE", value: stats.active },
      { icon: ExpireAds, label: "INACTIVE", value: stats.inactive },
    ],
    [stats],
  );

  const handleTabSelect = useCallback((tab) => {
    setActiveTab(tab.key);
    setSelectedTabLabel(tab.label);
    setShowTabDropdown(false);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!selectedEvent) return;
    deleteEvent(
      { suffixUrl: selectedEvent._id },
      {
        onSuccess: () => {
          dispatch(showNotification({ message: "Package deleted successfully", status: "success" }));
          queryClient.invalidateQueries({ queryKey: ["getMyEvents"] });
          setShowDeleteDialog(false);
          setSelectedEvent(null);
        },
        onError: (err) => {
          dispatch(showNotification({ message: err?.message || "Delete failed", status: "error" }));
          setShowDeleteDialog(false);
        },
      },
    );
  }, [selectedEvent, deleteEvent, dispatch, queryClient]);

  const handleToggleStatus = useCallback(() => {
    if (!selectedEvent) return;
    toggleStatus(
      { suffixUrl: `${selectedEvent._id}/toggle-status` },
      {
        onSuccess: (res) => {
          dispatch(showNotification({ message: res?.message || "Status updated", status: "success" }));
          queryClient.invalidateQueries({ queryKey: ["getMyEvents"] });
          queryClient.invalidateQueries({ queryKey: ["getPublicEvents"] });
          op.current?.hide();
        },
        onError: (err) => {
          dispatch(showNotification({ message: err?.message || "Toggle failed", status: "error" }));
          op.current?.hide();
        },
      },
    );
  }, [selectedEvent, toggleStatus, dispatch, queryClient]);

  const navigateToDetail = useCallback(
    (event) => navigate(ROUTES.EVENT_DETAIL.replace(":id", event._id), { state: { event } }),
    [navigate],
  );

  const navigateToEdit = useCallback(
    (event) => navigate(ROUTES.EDIT_EVENT.replace(":id", event._id), { state: { event } }),
    [navigate],
  );

  return (
    <div className="flex w-full overflow-auto items-center flex-col my-4 px-3">
      {/* Stats */}
      <div className="flex w-full justify-center lg:justify-start px-1 lg:flex-nowrap flex-wrap gap-2 lg:gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="flex flex-col w-[32%] min-w-[170px] h-[116px] border border-[#E3E8EA] bg-white rounded-lg gap-4 pt-4 lg:pl-6 pl-4 hover:shadow-sm transition-shadow duration-300">
            <div className="flex items-center gap-2 w-full">
              <stat.icon />
              <p className="font-inter font-medium text-[10px] text-[#808080] leading-[14px]">{stat.label}</p>
            </div>
            <div className="flex flex-col w-full h-12">
              <h1 className="font-archivo font-bold text-[32px] h-[35px] leading-[100%] text-[#44505A]">{stat.value}</h1>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col w-full px-4 mt-6">
        <div className="flex w-full justify-between items-center mb-2">
          <h1 className="font-archive font-semibold text-base text-[#4D4D4D]">My Event Packages</h1>
          <div
            className="relative flex justify-center items-center min-w-[120px] h-9 text-primary border border-primary rounded cursor-pointer"
            onClick={() => setShowTabDropdown(!showTabDropdown)}
          >
            <p className="flex items-center justify-between w-full px-3 text-primary text-sm">
              {selectedTabLabel} <ArrowDownIcon className="text-primary ml-1" />
            </p>
            {showTabDropdown && (
              <div className="absolute top-full right-0 mt-1 w-full bg-white border border-[#E3E8EA] rounded shadow-lg z-50">
                {EVENT_TABS.map((tab) => (
                  <div
                    key={tab.key}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-200 ${activeTab === tab.key ? "bg-gray-100 text-primary" : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => handleTabSelect(tab)}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-[#E3E8EA] my-3" />

        <Button
          label="+ Create Package"
          onClick={() => navigate(ROUTES.CREATE_EVENT)}
          className="text-white font-medium text-sm border rounded border-primary w-full h-[38px] bg-primary"
        />

        <div className="w-full mt-3">
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader /></div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onView={() => navigateToDetail(event)}
                  onEdit={() => navigateToEdit(event)}
                  onDelete={() => { setSelectedEvent(event); setShowDeleteDialog(true); }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-10">No packages found</p>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex flex-col w-[95%] mt-8 gap-4">
        <h1 className="font-archive font-semibold text-base text-[#4D4D4D]">My Event Packages</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {EVENT_TABS.map((tab) => (
              <Button
                key={tab.key}
                label={tab.label}
                onClick={() => handleTabSelect(tab)}
                className={`font-medium text-xs border rounded-2xl px-4 h-[32px] transition-colors duration-300 focus:ring-0 focus:outline-none ${
                  activeTab === tab.key
                    ? "bg-[#00796B] text-white border-[#00796B]"
                    : "bg-white text-primary border-primary hover:bg-blue-50"
                }`}
              />
            ))}
          </div>
          <Button
            label="+ Create Package"
            onClick={() => navigate(ROUTES.CREATE_EVENT)}
            className="text-white font-medium text-sm border rounded border-primary w-[150px] h-[33px] bg-primary"
          />
        </div>
      </div>

      {/* Desktop DataTable */}
      <div className="events-table mt-6 hidden lg:block">
        {isLoading ? (
          <div className="flex justify-center py-16"><Loader /></div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-[#E3E8EA]">
            <p className="text-[#808080] text-base font-medium">No packages found</p>
            <Button
              label="+ Create Package"
              onClick={() => navigate(ROUTES.CREATE_EVENT)}
              className="text-white font-medium text-sm border rounded border-primary w-[150px] h-[38px] bg-primary mt-4"
            />
          </div>
        ) : (
          <DataTable value={events} paginator={false} className="w-full">
            <Column
              header="Package Name"
              body={(row) => <p className="font-semibold text-sm text-[#4D4D4D]">{row.name}</p>}
            />
            <Column
              header="Main Car"
              body={(row) => (
                <p className="text-sm text-[#666666]">
                  {row.mainCar?.make?.name} {row.mainCar?.variant?.name} {row.mainCar?.year}
                </p>
              )}
            />
            <Column
              header="Fleet"
              body={(row) => (
                <span className="flex w-8 h-8 bg-[#00796B1A] rounded-full items-center justify-center text-sm font-semibold text-primary">
                  {row.fleetCars?.length || 0}
                </span>
              )}
            />
            <Column
              header="Package Price"
              body={(row) => (
                <p className="text-sm font-semibold text-[#4D4D4D]">
                  Rs {row.pricePerPackage?.toLocaleString()}
                </p>
              )}
            />
            <Column
              header="Status"
              body={(row) => (
                <div className={`flex w-[80px] h-5 rounded-[4px] items-center justify-center capitalize ${STATUS_STYLES[row.status] || "bg-gray-100 text-gray-500"}`}>
                  <p className="text-xs font-normal tracking-[0.5px]">{row.status}</p>
                </div>
              )}
            />
            <Column
              header="Actions"
              body={(row) => (
                <div
                  className="flex border border-primary rounded px-3 py-[6px] cursor-pointer hover:bg-blue-50 transition-colors duration-200 w-fit"
                  onClick={(e) => { setSelectedEvent(row); op.current.toggle(e); }}
                >
                  <span className="flex gap-2 items-center text-primary text-sm font-medium">
                    Manage <ArrowDownIcon />
                  </span>
                </div>
              )}
            />
          </DataTable>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex w-full justify-center px-14">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      {/* OverlayPanel */}
      <OverlayPanel ref={op} className="mt-1 shadow-lg" dismissable>
        <div className="flex flex-col w-[190px]">
          <div
            className="px-4 py-3 border-b border-[#EFEFEF] hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => { if (selectedEvent) { navigateToDetail(selectedEvent); op.current.hide(); } }}
          >
            <span className="text-sm text-[#5D717D]">View Details</span>
          </div>
          <div
            className="px-4 py-3 border-b border-[#EFEFEF] hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => { if (selectedEvent) { navigateToEdit(selectedEvent); op.current.hide(); } }}
          >
            <span className="text-sm text-[#5D717D]">Edit Package</span>
          </div>
          {(selectedEvent?.status === "active" || selectedEvent?.status === "inactive") && (
            <div
              className="px-4 py-3 border-b border-[#EFEFEF] hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={handleToggleStatus}
            >
              <span className={`text-sm font-medium ${selectedEvent?.status === "active" ? "text-[#F55A5A]" : "text-[#00796B]"}`}>
                {selectedEvent?.status === "active" ? "Mark Inactive" : "Mark Active"}
              </span>
            </div>
          )}
          <div
            className="px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors"
            onClick={() => { setShowDeleteDialog(true); op.current.hide(); }}
          >
            <span className="text-sm text-[#F55A5A]">Delete Package</span>
          </div>
        </div>
      </OverlayPanel>

      {/* Delete Dialog */}
      <CommonDialog
        open={showDeleteDialog}
        onClose={() => { setShowDeleteDialog(false); setSelectedEvent(null); }}
        className="md:!max-w-[450px] md:!w-[30%] !w-full !max-w-full mx-1 md:mx-0"
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">Delete Package</h1>
          <p className="text-sm text-[#5D717D] mt-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#4D4D4D]">"{selectedEvent?.name}"</span>?
            This action cannot be undone.
          </p>
          <div className="flex gap-4 w-full justify-between mt-8">
            <Button
              label="Cancel"
              onClick={() => { setShowDeleteDialog(false); setSelectedEvent(null); }}
              className="bg-transparent! border border-primary! w-full text-primary"
            />
            <PrimaryButton
              label={isDeleting ? "Deleting..." : "Delete"}
              loading={isDeleting}
              onClick={handleConfirmDelete}
              className="bg-red-600! hover:bg-red-700! border-red-600!"
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default Events;
