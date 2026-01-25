import { ApiUrl } from "../../../api/apiUrls";
import { useClientQuery } from "../../../api/api-service";
export const useGetAllAdds = (page, limit, isDeleted) => {
  return useClientQuery({
    queryKeys: ["GetAllAdds", { page, limit, isDeleted }],
    url: ApiUrl.AdminDashboard.GetAllAdds(page, limit, isDeleted),
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
