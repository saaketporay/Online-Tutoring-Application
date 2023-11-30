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
import EmailSignIn from './pages/EmailSignIn';
import StudentSignup, { userSignupAction } from './pages/StudentSignup';
import TutorSignup, {
  loader as tutorSignupLoader,
  action as tutorSignupAction,
} from './pages/TutorSignup';
import MeetingScheduler, {
  loader as meetingSchedulerLoader,
  action as meetingSchedulerAction,
} from './pages/MeetingScheduler';
import UserDashboard, { dashboardLoader } from './pages/UserDashboard';
import StudentEditProfileModal, {
  studentEditProfileAction,
} from './components/StudentEditProfileModal';
import DeleteAppointmentModal, {
  deleteAppointmentAction,
} from './components/DeleteAppointmentModal';
import EditTutorProfile, {
  loader as editTutorProfileLoader,
  action as editTutorProfileAction,
} from './pages/EditTutorProfile';
import Search, { loader as searchLoader } from './pages/Search';
import FavoriteTutorModal, {
  favoriteTutorAction, favoriteTutorLoader,
} from './components/FavoriteTutorModal';
import { useAppSelector } from './redux/hooks';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const user_type = useAppSelector((state) => state.auth.user_type);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={<AppLayout />}
        errorElement={<ErrorPage />}
        id='root'>
        <Route
          index={true}
          element={
            <ProtectedRoute
              isAllowed={user_type == ''}
              redirectTo='/dashboard'>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='signin'
          element={
            <ProtectedRoute
              isAllowed={user_type === ''}
              redirectTo='/dashboard'>
              <EmailSignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path='signup'
          element={
            <ProtectedRoute
              isAllowed={user_type == ''}
              redirectTo='/dashboard'
              children={null}
            />
          }>
          <Route
            path='student'
            element={<StudentSignup />}
            action={userSignupAction}
          />
          <Route
            path='tutor'
            element={<TutorSignup />}
            loader={tutorSignupLoader}
            action={tutorSignupAction}
          />
        </Route>
        <Route
          path='edit-tutor-profile'
          element={
            <ProtectedRoute
              isAllowed={user_type == 'tutor'}
              redirectTo='/'>
              <EditTutorProfile />
            </ProtectedRoute>
          }
          loader={editTutorProfileLoader}
          action={editTutorProfileAction}
        />
        <Route
          id='dashboard'
          path='dashboard'
          element={
            <ProtectedRoute
              isAllowed={user_type == 'student' || user_type == 'tutor'}
              redirectTo='/'>
              <UserDashboard />
            </ProtectedRoute>
          }
          loader={dashboardLoader}>
          <Route
            path='edit-profile'
            element={
              <ProtectedRoute
                isAllowed={user_type == 'student'}
                redirectTo='/'>
                <StudentEditProfileModal />
              </ProtectedRoute>
            }
            action={studentEditProfileAction}
          />
          <Route
            path='favorite'
          >
            <Route
              path=':tutorId'
              element={
                <ProtectedRoute
                  isAllowed={user_type == 'student'}
                  redirectTo='/'>
                  <FavoriteTutorModal />
                </ProtectedRoute>
              }
              loader={favoriteTutorLoader}
              action={favoriteTutorAction}
            />
          </Route>
          <Route
            path='appt'
          >
            <Route
              path='delete/:apptId'
              element={<DeleteAppointmentModal />}
              action={deleteAppointmentAction}
            />
          </Route>
        </Route>
        <Route
          path='new-appt'
          element={
            <ProtectedRoute
              isAllowed={user_type == 'student'}
              redirectTo='/'>
              <MeetingScheduler />
            </ProtectedRoute>
          }
          loader={meetingSchedulerLoader}
          action={meetingSchedulerAction}
        />
        <Route
          path='success'
          element={<FormSuccess />}
        />
        <Route
          path='search'
          element={<Search />}
          loader={searchLoader}
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
