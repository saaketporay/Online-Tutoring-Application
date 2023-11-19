import axios from "axios";
import { store } from "../redux/store";

export const axiosInstance = () => {
  const token = store.getState().auth.token;
  console.log(token)
  const instance = axios.create({
    baseURL: import.meta.env.BACKEND_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  console.log(import.meta.env.BACKEND_BASE_URL);
  return instance;
}

