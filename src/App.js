import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Task from './pages/Task';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toolbar } from '@mui/material';

function App() {
  return (
    <Router>
      <Navbar />
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/referrals" element={<div>Referrals Page</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
