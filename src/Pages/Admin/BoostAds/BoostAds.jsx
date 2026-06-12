import { useState, useMemo, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./BoostAds.css";
import {
  useApproveBoostRequest,
  useGetAllBoostAdsRequests,
  useRejectBoostRequest,
} from "./hooks/BoostAdsApi";
import SearchIcon from "../../../assets/SVG/search.svg?react";
import Action from "../../../assets/SVG/action.svg?react";
import { useDispatch } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Common/Pagination";
import CommonInput from "../../../Common/InputText";
import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import CommonDialog from "../../../Common/CommonDialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import PrimaryButton from "../../../Common/Button";
import { showNotification } from "../../../slices/notificationSlice";

const BoostAdds = () => {
  const op = useRef(null);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status, setStatus] = useState("new");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: BoostAdsRequests,
    mutate: fetchBoostAds,
    isPending: LoadingBoostAdsRequests,
  } = useGetAllBoostAdsRequests();

  useEffect(() => {
    fetchBoostAds({ page, limit, status: ["active"], tab: status });
  }, [page, status]);
  const { mutate: rejectBoostRequest, isPending: rejectingBoostRequest } =
    useRejectBoostRequest();
  const { mutate: approveBoostAdRequest, isPending: approvingBoostRequest } =
    useApproveBoostRequest();
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const filteredBoostRequests = useMemo(() => {
    if (!searchTerm) return BoostAdsRequests?.data || [];
    const searchLower = searchTerm.toLowerCase();
    return (BoostAdsRequests?.data || []).filter(
      (r) =>
        r?.make?.name?.toLowerCase().includes(searchLower) ||
        r?.model?.name?.toLowerCase().includes(searchLower) ||
        r?.business?.name?.toLowerCase().includes(searchLower) ||
        r?.business?.email?.toLowerCase().includes(searchLower) ||
        r?.business?.phoneNumber?.toLowerCase().includes(searchLower),
    );
  }, [BoostAdsRequests, searchTerm]);

  const handleApprove = () => {
    approveBoostAdRequest(
      { carId: selectedRow?._id },
      {
        onSuccess: (res) => {
          fetchBoostAds({ page, limit, status: ["active"], tab: status });
          op.current.hide();
          dispatch(
            showNotification({
              message: res?.message,
              status: "success",
            }),
          );
        },
        onError: (err) => {
          dispatch(
            showNotification({
              message: err?.message,
              status: "error",
            }),
          );
        },
      },
    );
  };
  const handleReject = () => {
    setShowRejectDialog(true);
    op.current?.hide();
  };
  const handleRejectWithReason = () => {
    if (!rejectReason.trim()) return;

    rejectBoostRequest(
      {
        carId: selectedRow?._id,
        rejectReason: rejectReason.trim(),
      },
      {
        onSuccess: (res) => {
          setShowRejectDialog(false);
          setRejectReason("");
          fetchBoostAds({ page, limit, status: ["active"], tab: status });
          op.current?.hide();
          dispatch(
            showNotification({
              message: res?.message,
              status: "success",
            }),
          );
        },
        onError: (error) => {
          setShowRejectDialog(false);
          setRejectReason("");
          dispatch(
            showNotification({
              message: error?.message,
              status: "error",
            }),
          );
        },
      },
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-cell">
        <div
          className="flex align-items-center cursor-pointer justify-center"
          onClick={(e) => {
            setSelectedRow(rowData);
            op.current.toggle(e);
          }}
        >
          <Action />
        </div>
      </div>
    );
  };
  return (
    <div className="flex w-full items-center h-full flex-col">
      <div className="hidden md:flex flex-col h-[66px] w-[1094px] mt-8 gap-4">
        <div className="flex w-full justify-between h-[17px]">
          <div className="flex w-full gap-2">
            <h1 className="flex w-full font-archive font-semibold text-base text-[#4D4D4D]">
              Boost Requests
            </h1>
          </div>
          <div className="flex w-full gap-2">
            <CommonInput
              type="text"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name, email, phone..."
              prefixIcon={SearchIcon}
              className="!h-10 w-full"
            />
          </div>
        </div>
        <div className="flex w-fit border-b border-[#DEDEDE] gap-5 mt-4 h-8">
          <h1
            className={`font-medium text-sm cursor-pointer transition-all duration-300 ${
              status === "new"
                ? "text-primary border-primary border-b"
                : "text-[#3E464C]"
            }`}
            onClick={() => {
              setStatus("new");
              setPage(1);
            }}
          >
            New Requests
          </h1>
          <h1
            className={`font-medium text-sm leading-5 cursor-pointer transition-all duration-300 ${
              status === "all"
                ? "text-primary border-primary border-b"
                : "text-[#3E464C]"
            }`}
            onClick={() => {
              setStatus("all");
              setPage(1);
            }}
          >
            All Boosted Requests
          </h1>
        </div>
      </div>

      <div className="mt-6 boostadd hidden md:block">
        {LoadingBoostAdsRequests ? (
          <div className="flex w-full justify-center mt-5">
            <Loader size={30} />
          </div>
        ) : BoostAdsRequests?.error ? (
          <p>Error loading data</p>
        ) : (
          <div className="w-full mt-3">
            <DataTable
              value={filteredBoostRequests}
              rows={limit}
              paginator={false}
              className="w-full"
            >
              <Column
                header="Ad Title"
                body={(rowData) => (
                  <div className="flex items-center gap-2">
                    <img
                      src={`${rowData?.photos[0]}`}
                      alt="ad-image"
                      className="!w-10 !h-10 object-cover rounded"
                    />
                    <p className="text-sm text-[#666666] font-normal">
                      {rowData?.make?.name ? `${rowData?.make?.name} ` : ""}{" "}
                      {rowData?.model?.name ? `${rowData?.model?.name}` : ""}{" "}
                      {rowData?.year ? `${rowData?.year}` : ""}
                    </p>
                  </div>
                )}
                headerClassName="bg-blue-600 text-start py-2"
              />
              <Column
                header="User Name"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.business?.name || "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Phone/Email"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.business?.phoneNumber
                      ? `${rowData.business.phoneNumber}`
                      : rowData?.business?.email
                        ? `${rowData.business.email}`
                        : "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Status"
                body={(rowData) => (
                  <p
                    className={`flex items-center justify-center px-5 py-1 text-sm font-normal rounded-[4px] ${rowData?.boost?.status === "active" ? "bg-[#00796B1A] text-[#00796B]" : rowData?.boost?.status === "pending" ? "bg-[#F57C001A] text-[#F57C00]" : rowData?.boost?.status === "rejected" ? "bg-[#D32F2F1A] text-[#D32F2F]" : rowData?.boost?.status === "inactive" ? "bg-[#6161611A] text-[#616161]" : "bg-gray-200 text-gray-600"}`}
                  >
                    {/* pending", "active", "inactive", "rejected */}
                    {rowData?.boost?.status === "pending"
                      ? "Pending"
                      : rowData?.boost?.status === "active"
                        ? "Active"
                        : rowData?.boost?.status === "rejected"
                          ? "Rejected"
                          : rowData?.boost?.status === "inactive"
                            ? "Inactive"
                            : "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />

              <Column
                header="Action"
                body={actionBodyTemplate}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
            </DataTable>
          </div>
        )}
        <OverlayPanel ref={op}>
          <div className="flex flex-col min-w-[120px]">
            <div
              className={`px-3 py-2 rounded ${selectedRow?.boost?.status === "active" ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
              onClick={
                selectedRow?.boost?.status !== "active"
                  ? handleApprove
                  : undefined
              }
            >
              <p className="text-sm font-medium">Approve</p>
            </div>
            <div
              className={`px-3 py-2 rounded ${selectedRow?.boost?.status === "inactive" || selectedRow?.boost?.status === "rejected" ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
              onClick={
                selectedRow?.boost?.status !== "inactive" &&
                selectedRow?.boost?.status !== "rejected"
                  ? handleReject
                  : undefined
              }
            >
              <p className="text-sm font-medium">Reject</p>
            </div>
          </div>
        </OverlayPanel>
      </div>
      {filteredBoostRequests?.length > 0 &&
        BoostAdsRequests?.pagination?.totalPages > 1 && (
          <div className="mt-6 flex w-full px-14">
            <Pagination
              currentPage={page}
              totalPages={BoostAdsRequests.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      <CommonDialog
        open={showRejectDialog}
        onClose={() => {
          setShowRejectDialog(false);
          setRejectReason("");
        }}
        className="md:!max-w-[450px] md:!w-[30%] !w-full !max-w-full mx-1 md:mx-0"
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">
            Reject Business
          </h1>
          <p className="text-sm text-[#5D717D] mt-2">
            Please provide a reason for rejecting this business
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
              label={rejectingBoostRequest ? "Processing..." : "Reject"}
              onClick={handleRejectWithReason}
              loading={rejectingBoostRequest}
              disabled={!rejectReason.trim() || rejectingBoostRequest}
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default BoostAdds;
