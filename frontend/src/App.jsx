import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('arnold_auth_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('arnold_auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('arnold_auth_token', newToken);
    localStorage.setItem('arnold_auth_user', JSON.stringify(newUser));
    setIsAdminView(true);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('arnold_auth_token');
    localStorage.removeItem('arnold_auth_user');
    setIsAdminView(false);
  };

  const handleOpenAdmin = () => {
    if (token) {
      setIsAdminView(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {isAdminView && token ? (
        <AdminDashboard
          user={user}
          token={token}
          onLogout={handleLogout}
          onBackToSite={() => setIsAdminView(false)}
        />
      ) : (
        <>
          <Navbar onOpenAdminModal={handleOpenAdmin} />
          <main className="flex-grow">
            <Hero />
            <About />
            <Services />
            <Contact />
          </main>
          <Footer onOpenAdminModal={handleOpenAdmin} />

          <LoginModal
            isOpen={loginModalOpen}
            onClose={() => setLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </>
      )}
    </div>
  );
}
