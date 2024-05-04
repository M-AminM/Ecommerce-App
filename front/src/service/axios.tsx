import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/", // Your API base URL
  // Other Axios configuration options...
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Check if the user is authenticated
      const isAuthenticated = await checkAuthentication(); // Implement this function to check user authentication status

      if (!isAuthenticated) {
        // If not authenticated, return a resolved promise to prevent Axios from rejecting the request
        return Promise.resolve(null);
      }
      // Handle other cases where user might be authenticated but still received a 401 error
      // You can redirect to login or show a notification
      //   window.location.href = "http://localhost:3000/login";
    }
    return Promise.reject(error);
  }
);

const checkAuthentication = async () => {
  // Implement your logic to check if the user is authenticated
  // For example, you can check if there's a token in localStorage or sessionStorage
  const token = localStorage.getItem("token"); // Check if token exists in localStorage
  return !!token; // Return true if token exists, false otherwise
};

export default axiosInstance;
