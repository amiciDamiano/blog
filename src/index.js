import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, LanguageProvider, AuthProvider } from './contexts';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <LanguageProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "right", vertical: "top" }}>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
