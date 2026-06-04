import { useClientMutation, useClientQuery } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";

export const useGetAllCars = () => {
  return useClientMutation({
    url: ApiUrl.Vehicle.GetAllCars(),
    method: "POST",
  });
};
export const useGetLocation = ({ input, sessionToken }) => {
  return useClientQuery({
    queryKeys: ["getLocation", input],
    url: ApiUrl.Location.GetLocation({ input, sessionToken }),
    enabled: !!input,
  });
};
export const useGetAllActiveByCountryId = (countryId) => {
  return useClientQuery({
    queryKey: ["getAllCity", countryId],
    url: ApiUrl?.City?.GetAllActiveByCountryId(countryId),
    enabled: !!countryId,
  });
};
