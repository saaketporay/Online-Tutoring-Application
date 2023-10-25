import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { globalTheme } from './theme';
import axios from 'axios';

if (import.meta.env.PROD == false) {
  axios.defaults.baseURL = 'http://localhost:3000';
} else {
  // axios.defaults.baseURL = amazon ec2 instance url for backend
}
axios.defaults.headers.common['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <App />
    </ ThemeProvider>
  </React.StrictMode>
);
