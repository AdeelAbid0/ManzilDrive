import { useClientQuery } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";

export const useGetAllCars = (
  page,
  limit,
  make,
  model,
  variant,
  status,
  year,
  location
) =>
  useClientQuery({
    queryKeys: [
      "GetAllCars",
      { page, limit, make, model, variant, status, year, location },
    ],
    url: ApiUrl.Vehicle.GetAllCars(
      page,
      limit,
      make,
      model,
      variant,
      status,
      year,
      location
    ),
    enabled: true,
  });
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
