import axios from "axios";

const Backend_URL = "http://vipasyanadoc-001-site19.ktempurl.com";

export const axiosInstance = axios.create({
  baseURL: `${Backend_URL}/api`,
  withCredentials: true,
});