import { useQuery } from "@tanstack/react-query";
import { ApiUrl } from "../../../api/apiUrls";
import api from "../../../api/AxiosInceptor";

export const useGetAllBusinessCars = (
  page,
  limit,
  status,
  viewAll,
  businessId
) => {
  return useQuery({
    queryKey: ["cars", { page, limit, status, viewAll, businessId }],
    queryFn: () =>
      api
        .post(ApiUrl.Vehicle.GetAllCarsByBusiness(), {
          page,
          limit,
          status,
          viewAll,
          businessId,
        })
        .then((res) => res.data),
    enabled: !!businessId,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
};
