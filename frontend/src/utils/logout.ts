import { redirect } from "react-router-dom";

export const logoutAction = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  // TODO: Check if user is already on a route which they are authorized to be in
  // and redirect to that. When user's type in a url like localhost:5173/signin 
  // this executes and just takes them back to the home page.
  return redirect('/');
};
