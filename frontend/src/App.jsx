import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import CMS from './pages/CMS';
import Woods from './pages/Woods';
import Contact from './pages/Contact';
import Login from './pages/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        {/* Navigation */}
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        {/* Page Content */}
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/woods" element={<Woods />} />
            <Route 
              path="/cms" 
              element={isLoggedIn ? <CMS /> : <Navigate to="/login" replace />} 
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/cms" replace /> : <Login onLogin={handleLogin} />} 
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
