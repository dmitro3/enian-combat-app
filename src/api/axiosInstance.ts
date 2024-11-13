// src/api/axiosInstance.ts
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken } from './authHelper';
import { redirect } from '@tanstack/react-router';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_API_URL, // Set your API base URL
   withCredentials: true, // Include credentials (cookies) for cross-origin requests if needed
});

// Flag to prevent multiple refresh requests at the same time
let isRefreshing = false;
let refreshSubscribers: ((newToken: string) => void)[] = []; // Explicitly typed array of functions

// Subscribe function to queue requests while refreshing
const subscribeTokenRefresh = (cb: (newToken: string) => void) => {
   refreshSubscribers.push(cb);
};

// Notify all subscribers after refresh
const onRefreshed = (newToken: string) => {
   refreshSubscribers.forEach((cb) => cb(newToken));
   refreshSubscribers = [];
};

// Request interceptor to add access token to headers
axiosInstance.interceptors.request.use(
   (config: AxiosRequestConfig): InternalAxiosRequestConfig<any> => {
      const token = getAccessToken();
      // Ensure headers is always an object
      config.headers = config.headers || {};

      if (token) {
         (config.headers as any).Authorization = `Bearer ${token}`;
      }
      return config as InternalAxiosRequestConfig<any>;
   },
   (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
         if (isRefreshing) {
            return new Promise((resolve) => {
               subscribeTokenRefresh((newToken) => {
                  originalRequest.headers['Authorization'] =
                     `Bearer ${newToken}`;
                  resolve(axiosInstance(originalRequest));
               });
            });
         }

         originalRequest._retry = true;
         isRefreshing = true;

         try {
            const response = await axiosInstance.post('/auth/refresh');
            const newAccessToken = response.data.accessToken;

            // Update the access token in storage
            setAccessToken(newAccessToken);

            // Retry original requests with new access token
            originalRequest.headers['Authorization'] =
               `Bearer ${newAccessToken}`;
            onRefreshed(newAccessToken);

            return axiosInstance(originalRequest); // Retry the failed request
         } catch (refreshError) {
            // Handle failed refresh, e.g., redirect to login
            console.error('Refresh token expired. Redirecting to login.');
            redirect({ to: '/' });
            return Promise.reject(refreshError);
         } finally {
            isRefreshing = false;
         }
      }

      return Promise.reject(error);
   }
);

export default axiosInstance;
