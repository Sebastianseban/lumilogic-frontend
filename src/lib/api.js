import axios from "axios";
import { getAdminToken, clearAdminToken } from "@/lib/adminAuth";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  // "http://localhost:4000/api/v1";
  "https://lumilogic-backend.onrender.com/api/v1"

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getAdminToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error?.response?.status;
      const url = error?.config?.url || "";
      const isAdminRoute = window.location.pathname.startsWith("/admin");
      const isAdminApi = url.includes("/admin/");
      const isAdminLoginApi = url.includes("/admin/login");

      if (status === 401 && isAdminRoute && isAdminApi && !isAdminLoginApi) {
        clearAdminToken();
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
