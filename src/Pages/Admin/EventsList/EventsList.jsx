import { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "../../../constants/routes";
import { showNotification } from "../../../slices/notificationSlice";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Common/Pagination";
import CommonDialog from "../../../Common/CommonDialog";
import PrimaryButton from "../../../Common/Button";
import Action from "../../../assets/SVG/action.svg?react";
import {
  useAdminGetAllEvents,
  useAdminApproveEvent,
  useAdminRejectEvent,
} from "./hooks/EventsListApi";
import "./EventsList.css";

const STATUS_STYLES = {
  active: "bg-[#00796B1A] text-[#00796B]",
  inactive: "bg-[#F55A5A1A] text-[#F55A5A]",
  pending: "bg-[#F57C001A] text-[#F57C00]",
  rejected: "bg-[#B3261E1A] text-[#B3261E]",
};

const EventsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const op = useRef(null);

  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [activeTab, setActiveTab] = useState("pending");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const status = activeTab === "pending" ? "pending" : "all";

  const { data: eventsData, isPending: isLoading } = useAdminGetAllEvents(
    page,
    limit,
    status,
  );
  const { data: pendingData } = useAdminGetAllEvents(1, 1000, "pending");
  const { mutate: approveEvent, isPending: isApproving } =
    useAdminApproveEvent();
  const { mutate: rejectEvent, isPending: isRejecting } = useAdminRejectEvent();

  const events = eventsData?.data || [];
  const totalPages = eventsData?.pagination?.totalPages || 1;
  const pendingCount =
    pendingData?.pagination?.total ?? pendingData?.data?.length ?? 0;

  const handleApprove = () => {
    approveEvent(
      { suffixUrl: `${selectedRow._id}/approve` },
      {
        onSuccess: (res) => {
          dispatch(
            showNotification({
              message: res?.message || "Event approved",
              status: "success",
            }),
          );
          queryClient.invalidateQueries({ queryKey: ["adminGetAllEvents"] });
          op.current?.hide();
        },
        onError: (err) => {
          dispatch(
            showNotification({
              message: err?.message || "Approval failed",
              status: "error",
            }),
          );
          op.current?.hide();
        },
      },
    );
  };

  const handleRejectWithReason = () => {
    if (!rejectReason.trim()) return;
    rejectEvent(
      {
        suffixUrl: `${selectedRow._id}/reject`,
        rejectionReason: rejectReason.trim(),
      },
      {
        onSuccess: (res) => {
          dispatch(
            showNotification({
              message: res?.message || "Event rejected",
              status: "success",
            }),
          );
          queryClient.invalidateQueries({ queryKey: ["adminGetAllEvents"] });
          setShowRejectDialog(false);
          setRejectReason("");
        },
        onError: (err) => {
          dispatch(
            showNotification({
              message: err?.message || "Rejection failed",
              status: "error",
            }),
          );
          setShowRejectDialog(false);
          setRejectReason("");
        },
      },
    );
  };

  const handleViewDetail = () => {
    navigate(ROUTES.EVENT_DETAIL.replace(":id", selectedRow._id), {
      state: { event: selectedRow },
    });
    op.current?.hide();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex w-full items-center flex-col my-4 max-w-[1102px]">
      <div className="w-full">
        <h1 className="font-archive font-semibold text-base text-[#4D4D4D] mb-4">
          Event Packages
        </h1>

        <div className="flex w-fit border-b border-[#DEDEDE] gap-5 mt-4 h-8">
          <h1
            className={`font-medium text-sm cursor-pointer transition-all duration-300 ${activeTab === "pending" ? "text-primary border-primary border-b" : "text-[#3E464C]"}`}
            onClick={() => {
              setActiveTab("pending");
              setPage(1);
            }}
          >
            New Requests <span className="font-bold pl-1">{pendingCount}</span>
          </h1>
          <h1
            className={`font-medium text-sm cursor-pointer transition-all duration-300 ${activeTab === "all" ? "text-primary border-primary border-b" : "text-[#3E464C]"}`}
            onClick={() => {
              setActiveTab("all");
              setPage(1);
            }}
          >
            All Events
          </h1>
        </div>

        <div className="mt-6 events-admin hidden md:block">
          {isLoading ? (
            <div className="flex w-full items-center justify-center h-[300px]">
              <Loader />
            </div>
          ) : (
            <DataTable value={events} paginator={false} className="w-full">
              <Column
                header="Package Name"
                body={(row) => (
                  <div className="flex items-center gap-2">
                    <img
                      src={row.mainCar?.photos?.[0] || "/Car.png"}
                      alt="car"
                      className="!w-10 !h-10 object-contain rounded bg-[#F7F7F7]"
                      onError={(e) => {
                        e.target.src = "/Car.png";
                      }}
                    />
                    <p className="text-sm text-[#4D4D4D] font-semibold">
                      {row.name}
                    </p>
                  </div>
                )}
              />
              <Column
                header="Business"
                body={(row) => (
                  <div>
                    <p className="text-sm text-[#666666] font-normal">
                      {row.business?.name || "N/A"}
                    </p>
                    <p className="text-xs text-[#808080]">
                      {row.business?.phoneNumber || row.business?.email || ""}
                    </p>
                  </div>
                )}
              />
              <Column
                header="Package Price"
                body={(row) => (
                  <p className="text-sm text-[#4D4D4D] font-semibold">
                    Rs {row.pricePerPackage?.toLocaleString()}
                  </p>
                )}
              />
              <Column
                header="Status"
                body={(row) => (
                  <span
                    className={`inline-flex items-center justify-center px-3 py-1 text-xs font-normal rounded-[4px] capitalize ${STATUS_STYLES[row.status] || "bg-gray-100 text-gray-500"}`}
                  >
                    {row.status}
                  </span>
                )}
              />
              <Column
                header="Action"
                body={(row) => (
                  <div
                    className="flex align-items-center cursor-pointer justify-center"
                    onClick={(e) => {
                      setSelectedRow(row);
                      op.current.toggle(e);
                    }}
                  >
                    <Action />
                  </div>
                )}
              />
            </DataTable>
          )}

          <OverlayPanel ref={op}>
            <div className="flex flex-col min-w-[120px] my-2">
              {selectedRow?.status === "pending" && (
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleApprove}
                >
                  <p className="text-sm font-normal">
                    {isApproving ? "Approving..." : "Approve"}
                  </p>
                </div>
              )}
              {selectedRow?.status === "pending" && (
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={() => {
                    setShowRejectDialog(true);
                    op.current?.hide();
                  }}
                >
                  <p className="text-sm font-normal">Reject</p>
                </div>
              )}
              <div
                className="px-3 py-2 text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                onClick={handleViewDetail}
              >
                <p className="text-sm font-normal">View Detail</p>
              </div>
            </div>
          </OverlayPanel>
        </div>

        {/* Mobile list */}
        <div className="md:hidden flex flex-col gap-3 mt-4">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader />
            </div>
          ) : events.length === 0 ? (
            <p className="text-center text-[#808080] py-10">No events found</p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg border border-[#E3E8EA] p-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[#4D4D4D]">
                      {event.name}
                    </p>
                    <p className="text-xs text-[#808080] mt-1">
                      {event.business?.name}
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      Rs {event.pricePerPackage?.toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex px-2 py-[2px] rounded text-[10px] font-medium capitalize ${STATUS_STYLES[event.status]}`}
                  >
                    {event.status}
                  </span>
                </div>
                {event.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      label="Approve"
                      onClick={() => {
                        setSelectedRow(event);
                        handleApprove();
                      }}
                      className="flex-1 h-8 text-xs border border-primary text-primary bg-transparent rounded"
                    />
                    <Button
                      label="Reject"
                      onClick={() => {
                        setSelectedRow(event);
                        setShowRejectDialog(true);
                      }}
                      className="flex-1 h-8 text-xs border border-[#F55A5A] text-[#F55A5A] bg-transparent rounded"
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex w-full justify-center px-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Reject Dialog */}
      <CommonDialog
        open={showRejectDialog}
        onClose={() => {
          setShowRejectDialog(false);
          setRejectReason("");
        }}
        className="md:!max-w-[450px] md:!w-[30%] !w-full !max-w-full mx-1 md:mx-0"
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">Reject Event</h1>
          <p className="text-sm text-[#5D717D] mt-2">
            Please provide a reason for rejecting this event package.
          </p>
          <div className="mt-6">
            <InputTextarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason"
              rows={4}
              className="font-inter font-normal text-input text-sm bg-[#F7F7F7] w-full h-[120px] rounded placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 pt-4"
            />
          </div>
          <div className="flex justify-end gap-3 mt-3">
            <Button
              label="Cancel"
              className="px-4 py-2 w-full border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectReason("");
              }}
            />
            <PrimaryButton
              label={isRejecting ? "Processing..." : "Reject"}
              onClick={handleRejectWithReason}
              loading={isRejecting}
              disabled={!rejectReason.trim() || isRejecting}
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default EventsList;
