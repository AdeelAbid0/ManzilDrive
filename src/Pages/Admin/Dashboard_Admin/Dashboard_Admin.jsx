import { useState, useRef, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Dashboard-admin.css";
import { Users, Eye, Clock, XCircle } from "lucide-react";
import {
  useApproveBusiness,
  useDeactivateBusiness,
  useGetAdsCount,
  useGetAllBusinesses,
  useRejectBusiness,
} from "./hooks/DashboardApi";
import SearchIcon from "../../../assets/SVG/search.svg?react";
import Action from "../../../assets/SVG/action.svg?react";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Common/Pagination";
import CommonInput from "../../../Common/InputText";
import CommonDialog from "../../../Common/CommonDialog";
import { InputTextarea } from "primereact/inputtextarea";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import PrimaryButton from "../../../Common/Button";

const Dashboard_Admin = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const op = useRef(null);

  const { data: AdsCount, isPending: LoadingAdsData } = useGetAdsCount();

  const {
    data: AllBusinsses,
    isLoading: DashboardDataLoading,
    error: DashboardDataError,
    refetch: refetchBusinesses,
  } = useGetAllBusinesses(page, limit);

  const { mutate: ApproveBusiness } = useApproveBusiness();

  const { mutate: RejectBusiness, isPending: RejectBusinessLoading } =
    useRejectBusiness();

  const { mutate: DeactivateBusiness } = useDeactivateBusiness();

  const stats = useMemo(
    () => [
      {
        icon: Users,
        label: "TOTAL USERS",
        value: AdsCount?.data?.totalUsers || 0,
      },
      { icon: Eye, label: "ACTIVE ADS", value: AdsCount?.data?.live || 0 },
      {
        icon: Clock,
        label: "EXPIRED ADS",
        value: AdsCount?.data?.expired || 0,
      },
      {
        icon: XCircle,
        label: "INACTIVE ADS",
        value: AdsCount?.data?.inactive || 0,
      },
    ],
    [AdsCount],
  );

  const filteredBusinesses = useMemo(() => {
    if (!searchTerm) return AllBusinsses?.businesses || [];
    const searchLower = searchTerm.toLowerCase();
    return (AllBusinsses?.businesses || []).filter(
      (b) =>
        b?.name?.toLowerCase().includes(searchLower) ||
        b?.email?.toLowerCase().includes(searchLower) ||
        b?.phoneNumber?.toLowerCase().includes(searchLower) ||
        b?.location?.city?.toLowerCase().includes(searchLower),
    );
  }, [AllBusinsses, searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApprove = () => {
    ApproveBusiness(
      { businessId: selectedRow?._id },
      {
        onSuccess: () => {
          refetchBusinesses();
          op.current.hide();
        },
      },
    );
  };

  const handleRejectWithReason = () => {
    if (!rejectReason.trim()) return;

    RejectBusiness(
      {
        businessId: selectedRow?._id,
        rejectReason: rejectReason.trim(),
      },
      {
        onSuccess: () => {
          setShowRejectDialog(false);
          setRejectReason("");
          refetchBusinesses();
          op.current?.hide();
        },
      },
    );
  };

  const handleReject = () => {
    setShowRejectDialog(true);
    op.current?.hide();
  };

  const handleDeactivate = () => {
    DeactivateBusiness(
      { businessId: selectedRow?._id },
      {
        onSuccess: () => {
          refetchBusinesses();
          op.current?.hide();
        },
      },
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  // Action button template
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

  // Name template
  const nameBodyTemplate = (rowData) => {
    return <span className="cell-content">{rowData?.name || "N/A"}</span>;
  };

  // Email template
  const emailBodyTemplate = (rowData) => {
    return <span className="cell-content">{rowData?.email || "N/A"}</span>;
  };

  // Phone template
  const phoneBodyTemplate = (rowData) => {
    return (
      <span className="cell-content">
        {rowData?.phoneNumber ? `${rowData?.phoneNumber}` : "N/A"}
      </span>
    );
  };

  // Location template
  const locationBodyTemplate = (rowData) => {
    return (
      <span className="cell-content">{rowData?.location?.city || "N/A"}</span>
    );
  };

  // Ads count template
  const adsBodyTemplate = (rowData) => {
    return <span className="cell-content">{rowData?.totalAds || 0}</span>;
  };

  // Status template
  const statusBodyTemplate = (rowData) => {
    const s = rowData?.status;
    const styles =
      s === "active"
        ? "bg-[#00796B1A] text-[#00796B]"
        : s === "rejected"
          ? "bg-[#D32F2F1A] text-[#D32F2F]"
          : s === "pending"
            ? "bg-[#F57C001A] text-[#F57C00]"
            : s === "inactive"
              ? "bg-[#78909C1A] text-[#78909C]"
              : "bg-gray-100 text-gray-500";
    return (
      <p
        className={`inline-flex items-center justify-center px-3 py-1 text-sm font-normal rounded-[4px] capitalize ${styles}`}
      >
        {s || "N/A"}
      </p>
    );
  };

  if (LoadingAdsData || DashboardDataLoading) {
    return (
      <div className="flex w-full items-center justify-center h-full flex-col my-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center flex-col my-4 max-w-[1102px]">
      {/* Stats Cards */}
      <div className="flex w-full justify-center md:justify-start md:flex-nowrap flex-wrap gap-2 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col w-[24%] min-w-[170px] h-[116px] border border-[#E3E8EA] bg-white rounded-lg gap-4 pt-4 md:pl-6 pl-4"
          >
            <div className="flex items-center gap-2 w-full">
              <stat.icon className="text-[#808080]" />
              <p className="font-inter font-medium text-[10px] text-[#808080] leading-[14px]">
                {stat.label}
              </p>
            </div>
            <div className="flex flex-col w-full h-12">
              <h1 className="font-archivo font-bold text-[32px] h-[35px] leading-[100%] text-[#44505A]">
                {stat.value}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay Panel */}
      <OverlayPanel ref={op}>
        <div className="flex flex-col min-w-[120px]">
          <div
            className={`px-3 py-2 rounded ${selectedRow?.status === "approved" ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
            onClick={
              selectedRow?.status !== "approved" ? handleApprove : undefined
            }
          >
            <p className="text-sm font-medium">Approve</p>
          </div>
          <div
            className={`px-3 py-2 rounded ${selectedRow?.status === "rejected" ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
            onClick={
              selectedRow?.status !== "rejected" ? handleReject : undefined
            }
          >
            <p className="text-sm font-medium">Reject</p>
          </div>
          <div
            className={`px-3 py-2 rounded ${selectedRow?.status === "inactive" ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
            onClick={
              selectedRow?.status !== "inactive" ? handleDeactivate : undefined
            }
          >
            <p className="text-sm font-medium text-red-600">Deactive</p>
          </div>
        </div>
      </OverlayPanel>

      {/* Search Section */}
      <div className="w-full mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-archive font-semibold text-base text-[#4D4D4D]">
            Recently Requested
          </h1>
          <div className="w-[300px]">
            <CommonInput
              type="text"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name, email, phone..."
              className="!h-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="dashboardadmin w-full ">
        {DashboardDataError ? (
          <div className="flex w-full justify-center mt-5">
            <p className="text-red-500">Error loading data</p>
          </div>
        ) : (
          <div className="w-full">
            <DataTable
              value={filteredBusinesses || []}
              rows={limit}
              paginator={false}
              className="w-full"
            >
              <Column
                header="Name"
                body={nameBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "200px" }}
              />
              <Column
                header="Email"
                body={emailBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "240px" }}
              />
              <Column
                header="Phone"
                body={phoneBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "130px" }}
              />
              <Column
                header="Location"
                body={locationBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "303px" }}
              />
              <Column
                header="Ads"
                body={adsBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "38px" }}
              />
              <Column
                header="Status"
                body={statusBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "120px" }}
              />
              <Column
                header="Action"
                body={actionBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "46px" }}
              />
            </DataTable>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredBusinesses?.length > 0 && AllBusinsses?.totalPages > 1 && (
        <div className="mt-6 flex w-full justify-center px-4 ">
          <Pagination
            currentPage={page}
            totalPages={AllBusinsses.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

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
              label={RejectBusinessLoading ? "Processing..." : "Reject"}
              onClick={handleRejectWithReason}
              loading={RejectBusinessLoading}
              disabled={!rejectReason.trim() || RejectBusinessLoading}
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default Dashboard_Admin;
