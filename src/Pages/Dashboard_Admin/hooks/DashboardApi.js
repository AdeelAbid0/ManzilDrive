import { ApiUrl } from "../../../api/apiUrls";
import { useClientQuery } from "../../../api/api-service";
export const useGetAllCars = (page, limit, status, viewAll, businessId) => {
  return useClientQuery({
    queryKeys: ["GetAllCars", { page, limit, status, viewAll, businessId }],
    url: ApiUrl.Dashboard.GetAllCars(page, limit, status, viewAll, businessId),
    enabled: !!businessId,
  });
};
export const useGetAddsCount = (businessId) => {
  return useClientQuery({
    queryKeys: ["GetAddsCount", { businessId }],
    url: ApiUrl.Dashboard.GetAddsCount(businessId),
    enabled: !!businessId,
  });
};
