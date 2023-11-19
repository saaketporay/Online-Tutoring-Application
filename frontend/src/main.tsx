import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { globalTheme } from './utils/theme';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const response = await fetch('100.24.50.65/availability/subjects')
console.log(response);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <ThemeProvider theme={globalTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
