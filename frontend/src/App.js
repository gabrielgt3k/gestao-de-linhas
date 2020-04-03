import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import GlobalStyles from './styles/global';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Routes from './routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f',
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
      light: '#64b5f6',
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
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav>
          <Routes />
          <GlobalStyles />
        </Nav>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
