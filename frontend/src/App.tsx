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
import ErrorPage from './pages/ErrorPage';
import GeneralSignin from './pages/GeneralSignin';
import StudentSignup from './pages/StudentSignup';
import MeetingScheduler from './pages/MeetingScheduler';
import EmailSignIn from './pages/EmailSignIn';
import FormSuccess from './pages/FormSuccess';
import TutorSignup from './pages/TutorSignup';
import StudentDashboard from './pages/StudentDashboard';
import TutorDashboard from './pages/TutorDashboard';

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
      <Route path="signin-email" element={<EmailSignIn />} />
      <Route path="signup" element={<StudentSignup />} />
      <Route path="success" element={<FormSuccess />} />
      <Route path="new-appt" element={<MeetingScheduler />} />
      <Route path="tutor-signup" element={<TutorSignup />} />
      <Route path="student" element={<StudentDashboard />} />
      <Route path="tutor" element={<TutorDashboard />} />
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
