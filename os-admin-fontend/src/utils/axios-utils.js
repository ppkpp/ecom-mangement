import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000", // Update this to match your NestJS backend
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupAxiosInterceptors = (logout) => {
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        const token = localStorage.getItem("refresh-token");
        const response = await client.post("/refresh-token", {
          'refresh-token': token,
        });
        const { refreshToken, accessToken } = response.data;
          localStorage.setItem("token", accessToken);
          localStorage.setItem("refresh-token", refreshToken);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        // Redirect to login page if token is invalid
         //logout();
      }
      return Promise.reject(error);
    }
  );
};
export const request = ({ ...options }) => {
  const onSuccess = (response) => {
    return response; // Return response data properly
  };

  const onError = (error) => {
    console.log("Request error:", error);
    throw error; // Re-throw error for proper handling
  };

  return client(options).then(onSuccess).catch(onError);
};
