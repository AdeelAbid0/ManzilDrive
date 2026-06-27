import { useQuery } from "@tanstack/react-query";
import { useClientMutation } from "../../../api/api-service";
import { ApiUrl } from "../../../api/apiUrls";
import api from "../../../api/AxiosInceptor";

const BUSINESS_CARS_URL = "cars/getAllCarsOfBusiness";

export const useGetMyEvents = (page = 1, limit = 10, status = "all") => {
  return useQuery({
    queryKey: ["getMyEvents", page, limit, status],
    queryFn: () =>
      api.get(ApiUrl.Events.GetMyEvents(page, limit, status)).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
};

export const useCreateEvent = () => {
  return useClientMutation({
    url: ApiUrl.Events.Create,
    method: "POST",
  });
};

export const useUpdateEvent = () => {
  return useClientMutation({
    url: "events/",
    method: "PUT",
  });
};

export const useDeleteEvent = () => {
  return useClientMutation({
    url: "events/",
    method: "DELETE",
  });
};

export const useToggleEventStatus = () => {
  return useClientMutation({
    url: "events/",
    method: "PATCH",
  });
};

export const useGetBusinessCarsForEvent = (businessId) => {
  return useQuery({
    queryKey: ["getBusinessCarsForEvent", businessId],
    queryFn: () =>
      api
        .post(BUSINESS_CARS_URL, {
          page: 1,
          limit: 100,
          status: ["live"],
          businessId,
        })
        .then((res) => res.data),
    enabled: !!businessId,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
};

export const useGetPublicEvents = (page = 1, limit = 12) => {
  return useQuery({
    queryKey: ["getPublicEvents", page, limit],
    queryFn: () =>
      api.get(ApiUrl.Events.GetPublicEvents(page, limit)).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
};

export const useGetPublicEventById = (id) => {
  return useQuery({
    queryKey: ["getPublicEventById", id],
    queryFn: () =>
      api.get(ApiUrl.Events.GetPublicEventById(id)).then((res) => res.data),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
};
