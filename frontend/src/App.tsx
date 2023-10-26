import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
// import GeneralSignin from './pages/GeneralSignin';
import StudentSignup from './pages/StudentSignup';
import MeetingScheduler, {
  loader as meetingSchedulerLoader,
  action as meetingSchedulerAction,
} from './pages/MeetingScheduler';
import EmailSignIn, { authAction } from './pages/EmailSignIn';
import FormSuccess from './pages/FormSuccess';
import TutorSignup, {
  loader as tutorSignupLoader,
  action as tutorSignupAction,
} from './pages/TutorSignup';
import StudentDashboard from './pages/StudentDashboard';
import TutorDashboard from './pages/TutorDashboard';
import MultifactorAuth from './components/MultifactorAuth';
import { logoutAction } from './utils/logout';
import { tokenLoader } from './utils/auth';
import { dashboardLoader, userInfoAction } from './utils/actions';
import PrivateRoute from './components/PrivateRoute';
import EditTutorProfile, {
  loader as editTutorProfileLoader,
  action as editTutorProfileAction,
} from './pages/EditTutorProfile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<AppLayout />}
      errorElement={<ErrorPage />}
      id='root'
      loader={tokenLoader}>
      <Route
        index={true}
        element={<Home />}
      />
      <Route
        path='signin'
        element={<EmailSignIn />}
        action={authAction}
      />
      <Route
        path='signin-email/:tokenId'
        id='mfa-auth'
        element={<MultifactorAuth />}
      />
      <Route path='signup'>
        <Route
          path='student'
          element={<StudentSignup />}
          action={userInfoAction}
        />
        <Route
          path='tutor'
          element={<TutorSignup />}
          loader={tutorSignupLoader}
          action={tutorSignupAction}
        />
      </Route>
      <Route
        path='dashboard'
        id='dashboard'
        loader={dashboardLoader}>
        <Route
          path='student'
          element={<StudentDashboard />}
        />
        <Route
          path='tutor'
          element={<TutorDashboard />}
        />
      </Route>
      <Route
        path='success'
        element={<FormSuccess />}
      />
      <Route
        path='new-appt'
        element={<MeetingScheduler />}
        loader={meetingSchedulerLoader}
        action={meetingSchedulerAction}
      />
      <Route
        path='edit-schedule'
        element={<EditTutorProfile />}
        loader={editTutorProfileLoader}
        action={editTutorProfileAction}
      />
      <Route
        path='logout'
        action={logoutAction}
      />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
