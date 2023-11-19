import Header from './Header';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/authSlice';

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const expiration = useAppSelector((state) => state.auth.expiration);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (token) {
      console.log(token);
      if (!token) {
        navigate('/');
      }
      else if (expiration) {
        const expirationDate = new Date(expiration);
        const now = new Date();
        const duration = expirationDate.getTime() - now.getTime();
        console.log(duration);
        setTimeout(() => {
          dispatch(logout());
          navigate('/');
        }, duration);
      }
    }
  }, [token]);

  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default AppLayout;
