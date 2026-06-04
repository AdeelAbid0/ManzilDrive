import { ApiUrl } from "../../../../api/apiUrls";
import { useClientMutation, useClientQuery } from "../../../../api/api-service";

export const useGetAllBoostAdsRequests = (page, limit, status) => {
  return useClientQuery({
    queryKeys: ["GetAllBoostAdsRequests", { page, limit, status }],
    url: ApiUrl.BoostAds.GetAllBoostAdsRequest(page, limit, status),
    enabled: true,
  });
};
export const useRejectBoostRequest = () => {
  return useClientMutation({
    url: ApiUrl.BoostAds.RejectBoostRequest(),
    method: "POST",
    enabled: true,
  });
};
export const useApproveBoostRequest = () => {
  return useClientMutation({
    url: ApiUrl.BoostAds.ApproveBoostRequest(),
    method: "POST",
    enabled: true,
  });
};
