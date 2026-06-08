import { useQuery } from "@tanstack/react-query";
import { ApiUrl } from "../../../api/apiUrls";
import { useClientMutation, useClientQuery } from "../../../api/api-service";
import api from "../../../api/AxiosInceptor";

export const useGetAllCars = (page, limit, status, viewAll, businessId) => {
  return useQuery({
    queryKey: ["GetAllCars", { page, limit, status, viewAll, businessId }],
    queryFn: () =>
      api
        .post(ApiUrl.Dashboard.GetAllCars(), {
          page,
          limit,
          status:
            status === "all" ? [] : Array.isArray(status) ? status : [status],
          viewAll,
          businessId,
        })
        .then((res) => res.data),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 0,
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
    url: ApiUrl.Dashboard.GetCarDetails(carId),
    enabled: !!carId,
  });
};

export const useUpdateCar = () => {
  return useClientMutation({
    url: ApiUrl.Vehicle.UpdateVehicle,
    method: "PUT",
  });
};
export const useUpdateCarAvailability = () => {
  return useClientMutation({
    url: ApiUrl.Vehicle.UpdateAvailability,
    method: "PATCH",
  });
};
