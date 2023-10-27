import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { globalTheme } from './theme';
import axios from 'axios';
import { Provider } from "react-redux";
import store from "./store.ts";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ ThemeProvider>
  </React.StrictMode>
);
