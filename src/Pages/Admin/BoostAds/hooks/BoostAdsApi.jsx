import { ApiUrl } from "../../../../api/apiUrls";
import { useClientMutation } from "../../../../api/api-service";

export const useGetAllBoostAdsRequests = () => {
  return useClientMutation({
    url: ApiUrl.BoostAds.GetAllBoostAdsRequest(),
    method: "POST",
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
