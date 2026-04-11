import { ApiUrl } from "../../../api/apiUrls";
import { useClientMutation, useClientQuery } from "../../../api/api-service";
export const useGetAllCars = (page, limit, status, viewAll, businessId) => {
  return useClientQuery({
    queryKeys: ["GetAllCars", { page, limit, status, viewAll, businessId }],
    url: ApiUrl.Dashboard.GetAllCars(page, limit, status, viewAll, businessId),
    enabled: true,
  });
};
export const useGetAdsCount = (businessId) => {
  return useClientQuery({
    queryKeys: ["GetAdsCount", { businessId }],
    url: ApiUrl.Dashboard.GetAdsCount(businessId),
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

export const useGetCarDetails = (carId) => {
  return useClientQuery({
    queryKeys: ["GetCarDetails", carId],
    url: `cars/getCarDetails/${carId}`,
    enabled: !!carId,
  });
};

export const useUpdateCar = () => {
  return useClientMutation({
    url: "cars/updateCar",
    method: "PUT",
  });
};
