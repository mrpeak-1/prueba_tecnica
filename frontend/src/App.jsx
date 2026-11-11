import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('arnold_auth_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('arnold_auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Configuración de scroll suave y animaciones de transición
  useEffect(() => {
    if (isAdminView) return;

    // Inicializar scroll suave
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Animación de aparición de elementos con GSAP
    const ctx = gsap.context(() => {
      // Animación en cascada en Hero
      gsap.from('.hero-anim-item', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Animación al hacer scroll en secciones
      const sections = ['#empresa', '#servicios', '#contacto'];
      sections.forEach((sec) => {
        const el = document.querySelector(sec);
        if (el) {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 0.85,
            ease: 'power2.out',
          });
        }
      });
    });

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, [isAdminView]);

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
    <div className="min-h-screen w-full flex flex-col font-sans overflow-x-hidden bg-white">
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
          <main className="flex-grow w-full">
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
