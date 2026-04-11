import { useClientMutation, useClientQuery } from "../../../../api/api-service";
import { ApiUrl } from "../../../../api/apiUrls";
export const useGetAllAds = (
  page = 1,
  limit = 10,
  status = "all",
  isDeleted = false,
) => {
  return useClientQuery({
    queryKeys: ["GetAllAds", { page, limit, status, isDeleted }],
    url: ApiUrl.AdsList.GetAllAds(page, limit, status, isDeleted),
    enabled: true,
  });
};
