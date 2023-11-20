import axios from "axios";
import { store } from "../redux/store";

export const axiosInstance = () => {
  const token = store.getState().auth.token;
  // console.log(token)
  const instance = axios.create({
    baseURL: `http://${import.meta.env.VITE_BACKEND_BASE_URL}:${import.meta.env.BACKEND_PORT}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  return instance;
}
