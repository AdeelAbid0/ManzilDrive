import { useQuery } from "@tanstack/react-query";
import { useClientMutation } from "../../../../api/api-service";
import { ApiUrl } from "../../../../api/apiUrls";
import api from "../../../../api/AxiosInceptor";

export const useGetAllAds = (
  page = 1,
  limit = 10,
  status = "all",
  tab = "new",
  isDeleted = false,
) => {
  return useQuery({
    queryKey: ["GetAllAds", { page, limit, status, tab }],
    queryFn: () =>
      api
        .post(ApiUrl.AdsList.GetAllAds(), {
          page,
          limit,
          tab,
          status:
            status === "all" ? [] : Array.isArray(status) ? status : [status],
        })
        .then((res) => res.data),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
};

export const useApproveAd = () => {
  return useClientMutation({
    mutationKey: ["ApproveAd"],
    url: ApiUrl.AdsList.ApproveAd(),
    enabled: true,
  });
};

export const useRejectAd = () => {
  return useClientMutation({
    mutationKey: ["RejectAd"],
    url: ApiUrl.AdsList.RejectAd(),
    enabled: true,
  });
};
