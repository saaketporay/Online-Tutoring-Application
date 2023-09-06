import Header from './components/Header'
import Signin from './pages/Signin'
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { Typography } from '@mui/material';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="signin" element={<Signin />}/>
    </Route>
  )
)

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography color="textPrimary">
          <Header />
          <RouterProvider router={router}/>
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default App;
