import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST interceptor → attach token
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor → handle expired / invalid token
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");

        // Optional: redirect to login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default Api;

