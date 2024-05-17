import axios from "axios";

const instance = axios.create({
  baseURL: "http://notes-backend-production-b684.up.railway.app",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
