import { redirect } from "react-router-dom";
import axios from "axios";

export const logoutAction = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  axios.defaults.headers.common['Authorization'] = null;
  return redirect('/');
};
