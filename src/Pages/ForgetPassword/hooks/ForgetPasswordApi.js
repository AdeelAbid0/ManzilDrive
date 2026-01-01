import { useClientMutation } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";

export const useResetPassword = () => {
  return useClientMutation({
    url: ApiUrl.Auth.ResetPassword,
    method: "POST",
  });
};
