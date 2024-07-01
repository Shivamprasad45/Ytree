import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Set your base URL here
});

export default axiosInstance;
