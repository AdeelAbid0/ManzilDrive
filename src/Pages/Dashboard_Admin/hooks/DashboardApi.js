import { useClientQuery } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";
export const useGetAllBusinesses = (page = 1, limit = 10) => {
  return useClientQuery({
    queryKeys: ["GetAllBusinesses", { page, limit }],
    url: ApiUrl.AdminDashboard.GetAllBusinesses(page, limit),
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
