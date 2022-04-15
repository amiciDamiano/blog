import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, LanguageProvider, AuthProvider } from './contexts';
import reportWebVitals from './reportWebVitals';
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
