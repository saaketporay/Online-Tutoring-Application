import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem('expiration')!;
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  if (getTokenDuration() < 0) {
    return "EXPIRED";
  }
  return token;
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect('/');
  }
  return null;
};

export const logoutAction = () => {
  localStorage.removeItem('token');
  redirect('/')
}
