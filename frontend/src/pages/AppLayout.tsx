import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useSubmit, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { getTokenDuration } from '../utils/auth';

function AppLayout() {
  const token = useLoaderData() as string;
  const submit = useSubmit();

  useEffect(() => {
    if (token) {
      console.log(token);
      if (token == null) {
        return;
      }
      if (token == "EXPIRED") {
        submit(null, { action: "/logout", method: "post" });
      } else {
        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);
        setTimeout(() => {
          submit(null, { action: "/logout", method: "post" });
        }, tokenDuration);
      }
    }
  }, [token]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
