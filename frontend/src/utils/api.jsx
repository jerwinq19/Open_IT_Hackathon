import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._entry) {
      original._retry = true;
    
      const refresh_token = localStorage.getItem("refresh_token");

      try {
        const response = await api.post("token/refresh/", {
          refresh_token: refresh_token,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);
        original.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log('2 Dito naman')
      } catch (error) {
        console.log('3 tite')
        localStorage.clear();
        window.location.href = '/login'
      }
    }
    console.log('1 Dito ang error')
    return Promise.reject(error);
  }
);

export default api;
