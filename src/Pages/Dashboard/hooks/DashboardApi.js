import { ApiUrl } from "../../../api/apiUrls";
import { useClientMutation, useClientQuery } from "../../../api/api-service";
export const useGetAllCars = (page, limit, status, viewAll, businessId) => {
  return useClientQuery({
    queryKeys: ["GetAllCars", { page, limit, status, viewAll, businessId }],
    url: ApiUrl.Dashboard.GetAllCars(page, limit, status, viewAll, businessId),
    enabled: true,
  });
};
export const useGetAddsCount = (businessId) => {
  return useClientQuery({
    queryKeys: ["GetAddsCount", { businessId }],
    url: ApiUrl.Dashboard.GetAddsCount(businessId),
    enabled: true,
  });
};
export const useBoostAd = () => {
  return useClientMutation({
    url: ApiUrl.Dashboard.BoostAd(),
    method: "POST",
  });
};
export const useDeleteAd = () => {
  return useClientMutation({
    url: ApiUrl.Dashboard.DeleteAd(),
    method: "POST",
  });
};
