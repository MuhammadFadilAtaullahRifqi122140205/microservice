import {
  createAxiosInstance,
  createAxiosInstanceWithToken,
} from '../config/axiosInstance';

// Base URLs for different services
const AUTH_SERVICE_URL = import.meta.env.VITE_APP_AUTH_SERVICE_URL;
const USER_SERVICE_URL = import.meta.env.VITE_APP_USER_SERVICE_URL;
const PRODUCT_SERVICE_URL = import.meta.env.VITE_APP_PRODUCT_SERVICE_URL;

// Example usage without Bearer token (e.g., login)
export const login = async (username, password) => {
  try {
    const axiosInstance = createAxiosInstance(AUTH_SERVICE_URL);
    const response = await axiosInstance.post('/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Example usage with Bearer token (e.g., fetching user profile)
export const getUserProfile = async (token) => {
  try {
    const axiosInstance = createAxiosInstanceWithToken(USER_SERVICE_URL, token);
    const response = await axiosInstance.get('/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
