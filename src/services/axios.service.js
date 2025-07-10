import axios from "axios";

const Backend_URL = "https://prescription-tracker-backend.onrender.com";

export const axiosInstance = axios.create({
  baseURL: `${Backend_URL}/api`,
  withCredentials: true,
});