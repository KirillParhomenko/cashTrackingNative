import axios from "axios";

const API_URL = "http://localhost:5000/api";

const apiInstance = axios.create({ baseURL: API_URL, withCredentials: true });

apiInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default apiInstance;
