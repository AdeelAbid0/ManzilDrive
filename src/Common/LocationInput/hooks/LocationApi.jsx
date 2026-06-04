import { useClientQuery } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";

export const useLocationAPi = ({ input, sessionToken }) => {
  return useClientQuery({
    queryKeys: ["getLocation", input],
    url: ApiUrl.Location.GetLocation({ input, sessionToken }),
    enabled: !!input,
  });
};
