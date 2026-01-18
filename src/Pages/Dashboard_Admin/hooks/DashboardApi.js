import { useClientQuery } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";
export const useGetAllBusinesses = () =>
  // page,
  // limit,
  // status,
  // viewAll,
  // businessId,
  {
    return useClientQuery({
      // queryKeys: ["GetAllCars", { page, limit, status, viewAll, businessId }],
      // queryKeys: ["GetAllBUsinesses", {}],
      // url: ApiUrl.Dashboard.GetAllCars(page, limit, status, viewAll, businessId),
      url: ApiUrl.AdminDashboard.GetAllBusinesses,
      enabled: true,
    });
  };
// export const useGetAddsCount = (businessId) => {
//   return useClientQuery({
//     queryKeys: ["GetAddsCount", { businessId }],
//     url: ApiUrl.Dashboard.GetAddsCount(businessId),
//     enabled: !!businessId,
//   });
// };
