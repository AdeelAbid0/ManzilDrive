import { useClientQuery, useClientMutation } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";

export const useGetAllMakes = () => {
  return useClientQuery({
    url: ApiUrl?.Makes?.GetAllActiveMakes(),
  });
};
export const useGetAllmodelByMake = (makeId) => {
  return useClientQuery({
    queryKeys: ["getAllModelsByMake", makeId],
    url: ApiUrl?.Models?.GetAllModelsByMake(makeId),
    enabled: !!makeId,
  });
};
export const useGetAllVariantsBymodel = (modelId) => {
  return useClientQuery({
    queryKeys: ["getAllVariants", modelId],
    url: ApiUrl.Variant.GetVariantBymodel(modelId),
    enabled: !!modelId,
  });
};
export const useGetAllActiveByCountryId = (countryId) => {
  return useClientQuery({
    queryKeys: ["getAllCity", countryId],
    url: ApiUrl?.City?.GetAllActiveByCountryId(countryId),
    enabled: !!countryId,
  });
};
export const useGetLocation = ({ input, sessionToken }) => {
  return useClientQuery({
    queryKeys: ["getLocation", input],
    url: ApiUrl.Location.GetLocation({ input, sessionToken }),
    enabled: !!input,
  });
};
export const AddBusiness = () => {
  return useClientMutation({
    url: ApiUrl.Business.AddBusiness,
    method: "PUT",
  });
};
export const AddVehicle = () => {
  return useClientMutation({
    url: ApiUrl.Vehicle.AddVehicle,
    method: "POST",
  });
};
export const useVerifyPhone = () => {
  return useClientMutation({
    url: ApiUrl.Auth.SendPhoneVerification,
    method: "POST",
  });
};
export const useGetBusinessDetail = (businessId) => {
  return useClientQuery({
    queryKeys: ["getBusinessDetail", businessId],
    url: ApiUrl.Business.GetBusinessDetail(businessId),
    enabled: !!businessId,
  });
};
export const useVerifyPhoneAuth = () => {
  return useClientMutation({
    url: ApiUrl.Business.VerifyPhone,
    method: "POST",
  });
};
export const useSendOTP = () => {
  return useClientMutation({
    url: ApiUrl.Business.sendOTP,
    method: "POST",
  });
};
export const useSendEmailVerificationCode = () => {
  return useClientMutation({
    url: ApiUrl.Auth.VerifyEmail,
    method: "POST",
  });
};
export const useVerifyEmailOtp = () => {
  return useClientMutation({
    url: ApiUrl.Auth.verifyEmailOtp,
    method: "POST",
  });
};
