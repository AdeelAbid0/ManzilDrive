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
export const useUpdateVehicle = () => {
  return useClientMutation({
    method: "PUT",
    url: ApiUrl.Vehicle.UpdateVehicle,
  });
};
