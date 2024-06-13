import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://greenfatuer.vercel.app", // Set your base URL here
});

export default axiosInstance;
