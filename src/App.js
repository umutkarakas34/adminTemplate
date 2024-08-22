import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Task from './pages/Task';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { Box, CssBaseline } from '@mui/material';

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <CssBaseline />
      <Router>
        <Navbar />
        <Box flexGrow={1}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Task />
                </PrivateRoute>
              }
            />
            <Route
              path="/referrals"
              element={
                <PrivateRoute>
                  <div>Referrals Page</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
