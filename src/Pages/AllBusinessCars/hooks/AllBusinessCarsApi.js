import { useClientQuery } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";

export const useGetAllBusinessCars = (
  page,
  limit,
  status,
  viewAll,
  businessId,
) => {
  return useClientQuery({
    queryKey: ["cars", page, limit, status, viewAll, businessId],
    url: ApiUrl.Vehicle.GetAllCarsByBusiness(
      page,
      limit,
      status,
      viewAll,
      businessId,
    ),
    enabled: !!businessId,
  });
};
