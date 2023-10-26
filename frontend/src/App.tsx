import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import FormSuccess from './pages/FormSuccess';
// import GeneralSignin from './pages/GeneralSignin';
import StudentSignup from './pages/StudentSignup';
import MeetingScheduler, {
  loader as meetingSchedulerLoader,
  action as meetingSchedulerAction,
} from './pages/MeetingScheduler';
import EmailSignIn, { authAction } from './pages/EmailSignIn';
import TutorSignup, {
  loader as tutorSignupLoader,
  action as tutorSignupAction,
} from './pages/TutorSignup';
import UserDashboard from './pages/UserDashboard';
import MultifactorAuth from './components/MultifactorAuth';
import StudentEditProfileModal from './components/StudentEditProfileModal';
import DeleteAppointmentModal from './components/DeleteAppointmentModal';
import { logoutAction } from './utils/logout';
import { tokenLoader } from './utils/auth';
import { dashboardLoader, deleteAppointmentAction, userInfoAction } from './utils/actions';

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
        id='dashboard'
        path='dashboard'
        element={<UserDashboard />}
        loader={dashboardLoader}>
        <Route
          path="edit-profile"
          element={<StudentEditProfileModal />}
          action={userInfoAction}
        />
        <Route
          path="delete-appt/:apptId"
          element={<DeleteAppointmentModal />}
          action={deleteAppointmentAction}
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
