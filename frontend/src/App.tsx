import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { globalTheme } from "./utils/theme";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
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
import FavoriteTutorModal, { 
  favoriteTutorAction,
} from "./components/FavoriteTutorModal";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

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
          path="favorite/:tutorId"
          element={<FavoriteTutorModal />}
          action={favoriteTutorAction}
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={globalTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
