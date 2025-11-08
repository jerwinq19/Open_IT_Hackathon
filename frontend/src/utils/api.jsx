import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._entry) {
      original._retry = true;
    
      const refresh_token = localStorage.getItem("refresh_token");

      try {
        const response = await api.post("token/refresh", {
          refresh_token: refresh_token,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);
        original.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        localStorage.clear();
        window.location.href = '/login'
      }
    }

    return Promise.reject(error);
  }
);

export default api;
