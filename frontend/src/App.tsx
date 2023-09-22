import Header from './components/Header';
import GeneralSignin from './pages/GeneralSignin';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import MeetingScheduler from './pages/MeetingScheduler';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route
        path='signin'
        element={<GeneralSignin />}
      />
      <Route
        path='new-appt'
        element={<MeetingScheduler />}
      />
    </Route>
  )
);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
