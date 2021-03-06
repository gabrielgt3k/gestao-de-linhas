import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import GlobalStyles from './styles/global';

import Routes from './routes/index';
import history from './services/history';

import { store, persistor } from './store';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f',
      mainGradient: 'linear-gradient(to right, #093028, #237A57)',
    },
    secondary: {
      light: '#ef6694',
      main: '#ec407a',
      dark: '#a52c55',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
    },
    info: {
      light: '#64b3f4',
      main: '#2196f3',
      dark: '#1976d2',
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <Routes />
          </Router>
          <GlobalStyles />
          <ToastContainer autoClose={5000} />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
