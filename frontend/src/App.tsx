import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import FormSuccess from "./pages/FormSuccess";
import EmailSignIn, { authAction } from "./pages/EmailSignIn";
import MultifactorAuth from "./components/MultifactorAuth";
import StudentSignup, { userSignupAction } from "./pages/StudentSignup";
import TutorSignup, {
  loader as tutorSignupLoader,
  action as tutorSignupAction,
} from "./pages/TutorSignup";
import MeetingScheduler, {
  loader as meetingSchedulerLoader,
  action as meetingSchedulerAction,
} from "./pages/MeetingScheduler";
import UserDashboard, { dashboardLoader } from "./pages/UserDashboard";
import StudentEditProfileModal, {
  studentEditProfileAction,
} from "./components/StudentEditProfileModal";
import DeleteAppointmentModal, {
  deleteAppointmentAction,
} from "./components/DeleteAppointmentModal";
import EditTutorProfile, {
  loader as editTutorProfileLoader,
  action as editTutorProfileAction,
} from "./pages/EditTutorProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
      errorElement={<ErrorPage />}
      id="root"
    >
      <Route 
        index={true} 
        element={<Home />} 
      />
      <Route 
        path="signin" 
        element={<EmailSignIn />} 
        action={authAction} 
      />
      <Route
        path="signin/:tokenId"
        id="mfa-auth"
        element={<MultifactorAuth />}
      />
      <Route 
        path="signup"
      >
        <Route
          path="student"
          element={<StudentSignup />}
          action={userSignupAction}
        />
        <Route
          path="tutor"
          element={<TutorSignup />}
          loader={tutorSignupLoader}
          action={tutorSignupAction}
        />
      </Route>
      <Route
        path="edit-tutor-profile"
        element={<EditTutorProfile />}
        loader={editTutorProfileLoader}
        action={editTutorProfileAction}
      />
      <Route
        id="dashboard"
        path="dashboard"
        element={<UserDashboard />}
        loader={dashboardLoader}
      >
        <Route
          path="edit-profile"
          element={<StudentEditProfileModal />}
          action={studentEditProfileAction}
        />
        <Route
          path="delete-appt/:apptId"
          element={<DeleteAppointmentModal />}
          action={deleteAppointmentAction}
        />
      </Route>
      <Route
        path="new-appt"
        element={<MeetingScheduler />}
        loader={meetingSchedulerLoader}
        action={meetingSchedulerAction}
      />
      <Route 
        path="success" 
        element={<FormSuccess />} 
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
