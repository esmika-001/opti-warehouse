import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // withCredentials: true, // Ensure credentials are included in all requests
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const freshToken = localStorage.getItem("token");
    if (freshToken) {
      config.headers["Authorization"] = freshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      // Handle 401 error
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
  }
);

export default axiosInstance;