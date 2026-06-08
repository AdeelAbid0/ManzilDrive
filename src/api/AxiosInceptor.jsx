import axios from "axios";
import { ApiUrl } from "./apiUrls";
import { ROUTES } from "../constants/routes";
import { store } from "../store/store";
import { setUser, clearUser } from "../slices/userSlice";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) =>
        failedQueue.push({ resolve, reject }),
      ).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${ApiUrl.Auth.refreshToken}`,
        { refreshToken: user?.refreshToken },
      );

      const newToken = data.accessToken;
      store.dispatch(setUser({ ...user, token: newToken }));
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      processQueue(null, newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      store.dispatch(clearUser());
      window.location.href = ROUTES.LOGIN;
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
