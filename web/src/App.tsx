import React from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { theme } from './utils/theme';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import SigninPage from './pages/SigninPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
