import {
  skipToken,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { isEmpty } from "lodash";
import api from "./AxiosInceptor";

export const useClientQuery = ({
  queryKeys = [],
  url = "",
  enabled = true,
  staleTime = 5 * 60 * 1000,
}) => {
  return useQuery({
    queryKey: queryKeys?.length ? queryKeys : [url],
    queryFn: () => api.get(url).then((res) => res.data),
    enabled: enabled && !!url,
    staleTime,
    retry: 0,
  });
};
export const useClientMutation = ({
  queryKeys = [],
  url = "",
  method = "POST",
}) => {
  return useMutation({
    mutationKey: queryKeys?.length ? queryKeys : [url],
    mutationFn: async (payload) => {
      try {
        let finalUrl = url;
        let body = payload;

        // If payload is a plain object with suffixUrl
        if (!(payload instanceof FormData) && payload?.suffixUrl) {
          finalUrl = `${url}${payload.suffixUrl ?? ""}`;
          const { suffixUrl, ...rest } = payload;
          body = isEmpty(rest) ? undefined : rest;
        }

        const response = await api({
          method,
          url: finalUrl,
          data: body, // Can be FormData or JSON object
        });

        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    timeout: 10000,
  });
};
