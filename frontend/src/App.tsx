import Header from './components/Header';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet
} from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage'
import GeneralSignin from './pages/GeneralSignin';
import StudentSignup from './pages/StudentSignup'

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
      <Route path="" element={<Home />} />
      <Route path="signin" element={<GeneralSignin />} />
      <Route path="signup" element={<StudentSignup />} />
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
