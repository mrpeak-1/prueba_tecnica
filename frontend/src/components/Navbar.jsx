import React, { useState } from 'react';
import { Building2, Menu, X, Shield, Phone, Mail, ChevronRight, Lock } from 'lucide-react';

export default function Navbar({ onOpenAdminModal, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Empresa', href: '#empresa' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Corporativo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">ARNOLD</span>
              <span className="block text-xs font-semibold text-slate-400 tracking-widest uppercase">Enterprise Solutions</span>
            </div>
          </a>

          {/* Enlaces Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Acciones */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contacto"
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2"
            >
              Solicitar Cotización
            </a>
            <button
              onClick={onOpenAdminModal}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm hover:shadow flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Panel Admin
            </button>
          </div>

          {/* Botón Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              Solicitar Cotización
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Acceso Administrativo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
