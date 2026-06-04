import { use } from "react";
import { useClientMutation, useClientQuery } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";

export const useUpdateProfile = () => {
  return useClientMutation({
    url: ApiUrl.Profile.UpdateProfile,
    method: "PUT",
  });
};
export const useGetAllActiveByCountryId = (countryId) => {
  return useClientQuery({
    queryKey: ["getAllCity", countryId],
    url: ApiUrl?.City?.GetAllActiveByCountryId(countryId),
    enabled: !!countryId,
  });
};
export const useGetBusinessDetail = (businessId) => {
  return useClientQuery({
    queryKey: ["businessId", businessId],
    url: ApiUrl.Business.GetBusinessDetail(businessId),
    enabled: !!businessId,
  });
};
