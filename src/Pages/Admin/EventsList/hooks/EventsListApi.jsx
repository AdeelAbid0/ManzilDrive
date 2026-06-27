import { useQuery } from "@tanstack/react-query";
import { useClientMutation } from "../../../../api/api-service";
import { ApiUrl } from "../../../../api/apiUrls";
import api from "../../../../api/AxiosInceptor";

export const useAdminGetAllEvents = (page = 1, limit = 10, status = "all") => {
  return useQuery({
    queryKey: ["adminGetAllEvents", page, limit, status],
    queryFn: () =>
      api
        .get(ApiUrl.Events.Admin.GetAll(page, limit, status))
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
};

export const useAdminApproveEvent = () => {
  return useClientMutation({
    url: "events/admin/",
    method: "PATCH",
  });
};

export const useAdminRejectEvent = () => {
  return useClientMutation({
    url: "events/admin/",
    method: "PATCH",
  });
};
