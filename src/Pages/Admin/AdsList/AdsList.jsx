import { useState, useRef, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useApproveAd, useGetAllAds, useRejectAd } from "./hooks/AdsListApi";
import SearchIcon from "../../../assets/SVG/search.svg?react";
import Action from "../../../assets/SVG/action.svg?react";
import FilterIcon from "../../../assets/SVG/filter.svg?react";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Common/Pagination";
import CommonInput from "../../../Common/InputText";
import CommonDialog from "../../../Common/CommonDialog";
import PrimaryButton from "../../../Common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../constants/routes";
import { showNotification } from "../../../slices/notificationSlice";
import { useQueryClient } from "@tanstack/react-query";
import "./AdsList.css";

const AddList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const op = useRef(null);
  const filterOp = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const tab = status === "new" ? "new" : "all";

  const {
    data: GetAdsList,
    isPending: AdsLoading,
    error: AdsError,
  } = useGetAllAds(page, limit, status, tab);

  // Always-on query just for the new requests count — unaffected by active tab
  const { data: newRequestsData } = useGetAllAds(1, 10, "new", "new");
  const newRequestsCount = newRequestsData?.data?.length ?? 0;

  // Always-on query for status counts — unaffected by active filter
  const { data: allAdsForCount } = useGetAllAds(1, 1000, "all", "all");
  const statusCounts = useMemo(() => {
    const data = allAdsForCount?.data || [];
    return {
      inactive: data.filter((ad) => ad.status === "inactive").length,
      live: data.filter((ad) => ad.status === "live").length,
      pending: data.filter((ad) => ad.status === "pending").length,
      rejected: data.filter((ad) => ad.status === "rejected").length,
    };
  }, [allAdsForCount?.data]);

  const { mutate: approveAd } = useApproveAd();
  const { mutate: rejectAd, isPending: rejectingAd } = useRejectAd();

  const handleActionClick = (e, rowData) => {
    setSelectedRow(rowData);
    op.current.toggle(e);
  };

  const handleApprove = () => {
    approveAd(
      { carId: selectedRow._id },
      {
        onSuccess: (response) => {
          dispatch(
            showNotification({ message: response?.message, status: "success" }),
          );
          queryClient.invalidateQueries({ queryKey: ["GetAllAds"] });
        },
        onError: (error) => {
          dispatch(
            showNotification({
              message: error?.message || "Failed to approve ad",
              status: "error",
            }),
          );
        },
      },
    );
    op.current?.hide();
  };

  const handleReject = () => {
    setShowRejectDialog(true);
    op.current?.hide();
  };

  const handleRejectWithReason = () => {
    if (!rejectReason.trim()) return;
    rejectAd(
      { carId: selectedRow?._id, rejectReason: rejectReason.trim() },
      {
        onSuccess: (res) => {
          setShowRejectDialog(false);
          setRejectReason("");
          dispatch(
            showNotification({ message: res?.message, status: "success" }),
          );
          queryClient.invalidateQueries({ queryKey: ["GetAllAds"] });
        },
        onError: (error) => {
          setShowRejectDialog(false);
          setRejectReason("");
          dispatch(
            showNotification({ message: error?.message, status: "error" }),
          );
        },
      },
    );
  };

  const handleViewDetail = () => {
    navigate(ROUTES.DETAIL, { state: selectedRow });
    op.current?.hide();
  };

  const handleEdit = () => {
    navigate(ROUTES.EDIT_AD, { state: { carData: selectedRow } });
    op.current?.hide();
  };

  const handleDelete = () => {
    op.current?.hide();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleFilterClick = (e) => {
    filterOp.current.toggle(e);
  };

  const handleStatusFilter = (statusValue) => {
    setStatus(statusValue);
    setPage(1);
    filterOp.current?.hide();
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-cell">
        <div
          className="flex align-items-center cursor-pointer justify-center"
          onClick={(e) => handleActionClick(e, rowData)}
        >
          <Action />
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full items-center flex-col my-4 max-w-[1102px]">
      <div className="w-full">
        <h1 className="font-archive font-semibold text-base text-[#4D4D4D] mb-4">
          List of Ads
        </h1>

        <div className="flex w-full justify-between">
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
              <span className="font-bold pl-1">{newRequestsCount}</span>
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
              All Ads
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="flex w-full gap-2">
              <CommonInput
                type="text"
                name="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search here"
                prefixIcon={SearchIcon}
                prefixIconClassName="!left-3 !top-[9px]"
                className="!h-10 w-full"
              />
            </div>
            <div
              className="!w-10 !h-10 !rounded-sm border border-[#E3E7EA] flex shrink-0 cursor-pointer hover:bg-gray-100 justify-center items-center"
              onClick={handleFilterClick}
            >
              <FilterIcon />
            </div>
          </div>
        </div>

        <div className="mt-6 boostadd hidden md:block">
          {AdsLoading ? (
            <div className="flex w-full items-center justify-center h-[300px]">
              <Loader />
            </div>
          ) : AdsError ? (
            <div className="flex w-full justify-center mt-5">
              <p className="text-red-500">Error loading data</p>
            </div>
          ) : (
            <DataTable
              value={GetAdsList?.data || []}
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
                    {rowData?.phoneNumber
                      ? `${rowData?.phoneNumber}`
                      : rowData?.business?.email
                        ? `${rowData.business.email}`
                        : "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Status"
                body={(rowData) => {
                  const s = rowData?.status;
                  const styles =
                    s === "live"
                      ? "bg-[#00796B1A] text-[#00796B]"
                      : s === "pending"
                        ? "bg-[#F57C001A] text-[#F57C00]"
                        : s === "inactive"
                          ? "bg-[#6161611A] text-[#616161]"
                          : "bg-gray-100 text-gray-500";
                  return (
                    <p
                      className={`inline-flex items-center justify-center px-3 py-1 text-sm font-normal rounded-[4px] capitalize ${styles}`}
                    >
                      {s || "N/A"}
                    </p>
                  );
                }}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Action"
                body={actionBodyTemplate}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
            </DataTable>
          )}

          <OverlayPanel ref={op}>
            {status === "new" ? (
              <div className="flex flex-col min-w-[120px] my-2">
                <div
                  className={`px-3 py-2 border-b border-[#EFEFEF] rounded hover:rounded-none ${selectedRow?.status === "live" ? "opacity-40 cursor-not-allowed text-[#5D717D]" : "text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer"}`}
                  onClick={
                    selectedRow?.status !== "live" ? handleApprove : undefined
                  }
                >
                  <p className="text-sm font-normal">Approve</p>
                </div>
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleReject}
                >
                  <p className="text-sm font-normal">Reject</p>
                </div>
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleEdit}
                >
                  <p className="text-sm font-normal">Edit</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col min-w-[120px] my-2">
                <div
                  className={`px-3 py-2 border-b border-[#EFEFEF] rounded hover:rounded-none ${selectedRow?.status === "live" ? "opacity-40 cursor-not-allowed text-[#5D717D]" : "text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer"}`}
                  onClick={
                    selectedRow?.status !== "live" ? handleApprove : undefined
                  }
                >
                  <p className="text-sm font-normal">Approve</p>
                </div>
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleViewDetail}
                >
                  <p className="text-sm font-normal">View Detail</p>
                </div>
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleEdit}
                >
                  <p className="text-sm font-normal">Edit</p>
                </div>
                <div
                  className="px-3 py-2 text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleDelete}
                >
                  <p className="text-sm font-normal">Delete</p>
                </div>
              </div>
            )}
          </OverlayPanel>

          {/* Filter Overlay Panel */}
          <OverlayPanel ref={filterOp}>
            <div className="flex flex-col w-[257px] m-3">
              <div
                className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none flex justify-between items-center"
                onClick={() => handleStatusFilter("inactive")}
              >
                <p className="text-sm font-normal">INACTIVE</p>
                <span className="text-sm font-normal">
                  {statusCounts.inactive}
                </span>
              </div>
              <div
                className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none flex justify-between items-center"
                onClick={() => handleStatusFilter("live")}
              >
                <p className="text-sm font-normal">LIVE</p>
                <span className="text-sm font-normal">{statusCounts.live}</span>
              </div>
              <div
                className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none flex justify-between items-center"
                onClick={() => handleStatusFilter("pending")}
              >
                <p className="text-sm font-normal">PENDING</p>
                <span className="text-sm font-normal">
                  {statusCounts.pending}
                </span>
              </div>
              <div
                className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none flex justify-between items-center"
                onClick={() => handleStatusFilter("rejected")}
              >
                <p className="text-sm font-normal">REJECTED</p>
                <span className="text-sm font-normal">
                  {statusCounts.rejected}
                </span>
              </div>
            </div>
          </OverlayPanel>
        </div>

        {/* Pagination */}
        {GetAdsList?.data?.length > 0 &&
          GetAdsList?.pagination?.totalPages > 1 && (
            <div className="mt-6 flex w-full justify-center px-4">
              <Pagination
                currentPage={page}
                totalPages={GetAdsList.pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
      </div>

      <CommonDialog
        open={showRejectDialog}
        onClose={() => {
          setShowRejectDialog(false);
          setRejectReason("");
        }}
        className="md:!max-w-[450px] md:!w-[30%] !w-full !max-w-full mx-1 md:mx-0"
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">Reject Ad</h1>
          <p className="text-sm text-[#5D717D] mt-2">
            Please provide a reason for rejecting this ad
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
              label={rejectingAd ? "Processing..." : "Reject"}
              onClick={handleRejectWithReason}
              loading={rejectingAd}
              disabled={!rejectReason.trim() || rejectingAd}
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default AddList;
