import { useClientMutation, useClientQuery } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";
export const useGetAllBusinesses = (page = 1, limit = 10) => {
  return useClientQuery({
    queryKeys: ["GetAllBusinesses", { page, limit }],
    url: ApiUrl.AdminDashboard.GetAllBusinesses(page, limit),
    enabled: true,
  });
};
export const useGetAddsCount = () => {
  return useClientQuery({
    url: ApiUrl.AdminDashboard.GetAddsCount(),
    enabled: true,
  });
};
export const useApproveBusiness = () => {
  return useClientMutation({
    url: ApiUrl.AdminDashboard.ApproveBusiness(),
    method: "PUT",
    enabled: true,
  });
};
export const useRejectBusiness = () => {
  return useClientMutation({
    url: ApiUrl.AdminDashboard.RejectBusiness(),
    method: "PUT",
    enabled: true,
  });
};
