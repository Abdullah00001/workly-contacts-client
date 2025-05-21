import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import env from "./env.configs";

// const { logout } = useAuth();

const { BASE_URL } = env;

// Extend to support retry flag
// interface CustomAxiosRequestConfig extends AxiosRequestConfig {
//   _retry?: boolean;
// }

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, //
});

// axiosClient.interceptors.request.use((config: AxiosRequestConfig) => config);

// axiosClient.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig;

//     if (
//       error.response?.status === 403 &&
//       !originalRequest._retry &&
//       !originalRequest.url?.includes("/refresh")
//     ) {
//       originalRequest._retry = true;
//       try {
//         await axiosClient.post("/refresh");
//         return axiosClient(originalRequest);
//       } catch (refreshError) {
//         logout();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosClient;
