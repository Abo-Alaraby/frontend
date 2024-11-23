import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-api-base-url.com", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
