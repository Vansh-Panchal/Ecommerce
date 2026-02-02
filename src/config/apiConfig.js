import axios from "axios";

export const API_BASE_URL = "";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
