import axios from 'axios';

// Function to create an Axios instance without Bearer token
const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
  });
};

// Function to create an Axios instance with Bearer token
const createAxiosInstanceWithToken = (baseURL, token) => {
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { createAxiosInstance, createAxiosInstanceWithToken };
