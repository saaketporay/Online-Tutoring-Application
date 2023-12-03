import axios from 'axios';
import { store } from '../redux/store';

export const axiosInstance = (sendingImg = false) => {
  const token = store.getState().auth.token;
  const instance = axios.create({
    baseURL: `http://${import.meta.env.VITE_BACKEND_BASE_URL}:${import.meta.env.VITE_BACKEND_PORT}`,
    headers: {
      'Content-Type': sendingImg ? 'multipart/form-data' : 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};
