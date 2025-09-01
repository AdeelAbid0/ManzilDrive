import { useClientMutation } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";
export const useRegisterApi = () => {
  return useClientMutation({
    url: ApiUrl.Auth.Register,
    method: "POST",
  });
};
// export const useVerifyEmail = () => {
//   return useClientMutation({
//     url: ApiUrl.Auth.VerifyEmail,
//     method: "POST",
//   });
// };

export const useVerifyPhone = () => {
  return useClientMutation({
    url: ApiUrl.Auth.VerifyPhone,
    method: "POST",
  });
};
