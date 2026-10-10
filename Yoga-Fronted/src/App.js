import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import YogaPosesPage from './pages/YogaPosesPage';
import PoseDetailPage from './pages/PoseDetailPage';
import PoseDetectionPage from './pages/PoseDetectionPage';
import FeedbackPage from './pages/FeedbackPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className="page-wrapper">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/poses" element={<YogaPosesPage />} />
        <Route path="/poses/:id" element={<PoseDetailPage />} />
        <Route path="/detect" element={<PoseDetectionPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
