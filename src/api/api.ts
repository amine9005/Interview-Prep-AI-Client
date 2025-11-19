import axios from "axios";
import { BASE_URL } from "../utils/apiPaths";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/";
    } else if (error.response.status === 500) {
      console.error("Server error. Please try again later");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out. Please try again later");
    }
    return Promise.reject(error);
  }
);

export default api;
