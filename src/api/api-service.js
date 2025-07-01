import {
  skipToken,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { isEmpty } from "lodash";
const BASE_URL = process.env.REACT_APP_API_URL;

export const useClientQuery = ({
  queryKeys = [],
  url = "",
  enabled = true,
  staleTime = 5 * 60 * 1000,
}) => {
  return useQuery({
    queryKey: queryKeys?.length ? queryKeys : [url],
    queryFn: () => fetch(`${BASE_URL}${url}`).then((res) => res.json()),
    enabled: enabled && !!url,
    staleTime,
  });
};

export const useClientQueies = ({
  queryKeys = [],
  urls = [],
  enabled = true,
  staleTime = 5 * 60 * 1000,
}) => {
  return useQueries({
    queries: urls.map((url) => ({
      queryKey: [url],
      queryFn: async () =>
        await fetch(`${BASE_URL}${url}`).then((res) => res.json()),
      enabled: enabled && !!url,
      staleTime,
    })),
  });
};

export const useClientMutation = ({
  queryKeys = [],
  url = "",
  method = "POST",
}) => {
  return useMutation({
    mutationKey: queryKeys?.length ? queryKeys : [url],
    mutationFn: ({ suffixUrl, ...data }) => {
      const body = isEmpty(data) ? undefined : JSON.stringify(data);
      return fetch(`${BASE_URL}${url}${suffixUrl ?? ""}`, {
        method,
        body,
        headers: {
          "Content-Type": "application/json",
          // ".Aspxauth": localStorage.getItem("Token")
        },
      }).then((res) => res.json());
    },
  });
};
