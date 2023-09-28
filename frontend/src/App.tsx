import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route, 
  Outlet
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage'
import GeneralSignin from './pages/GeneralSignin';
import StudentSignup from './pages/StudentSignup'
import MeetingScheduler from './pages/MeetingScheduler';

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
      <Route path="" element={<Home />} />
      <Route path="signin" element={<GeneralSignin />} />
      <Route path="signup" element={<StudentSignup />} />
      <Route path="new-appt" element={<MeetingScheduler />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
