import { ApiUrl } from "../../../../api/apiUrls";
import { useClientMutation, useClientQuery } from "../../../../api/api-service";

export const useGetAllBoostAdsRequests = (page, limit, status, tab) => {
  return useClientQuery({
    queryKeys: ["GetAllBoostAdsRequests", { page, limit, status, tab }],
    url: ApiUrl.BoostAds.GetAllBoostAdsRequest(page, limit, status, tab),
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
