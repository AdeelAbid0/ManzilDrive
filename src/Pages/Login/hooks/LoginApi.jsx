import { useClientMutation } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";
export const useLoginApi = () => {
  return useClientMutation({
    url: ApiUrl.Auth.Login,
    method: "POST",
  });
};
export const useGoogleLoginApi = () => {
  return useClientMutation({
    url: ApiUrl.Auth.GoogleLogin,
    method: "POST",
  });
};
export const useResendOTP = () => {
  return useClientMutation({
    url: ApiUrl.Auth.SendPhoneVerification,
    method: "POST",
  });
};
