import React from 'react';
import { Building2, Mail, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenAdminModal }) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Marca corporativa */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">ARNOLD ENTERPRISE</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Soluciones integrales de software empresarial, consultoría cloud y ciberseguridad avanzada. Diseñado con estándares de alta disponibilidad.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Desarrollado y sustentado por <strong className="text-slate-300">Migue Cordova</strong> — Ingeniero de Software Full Stack.
            </div>
          </div>

          {/* Navegación */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="hover:text-blue-400 transition-colors">Inicio</a></li>
              <li><a href="#empresa" className="hover:text-blue-400 transition-colors">Acerca de Arnold</a></li>
              <li><a href="#servicios" className="hover:text-blue-400 transition-colors">Portafolio de Servicios</a></li>
              <li><a href="#contacto" className="hover:text-blue-400 transition-colors">Formulario de Contacto</a></li>
            </ul>
          </div>

          {/* Gestión y Acceso */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Acceso Corporativo</h4>
            <p className="text-xs text-slate-400">
              Módulo restringido para el equipo de operaciones y administración de solicitudes.
            </p>
            <button
              onClick={onOpenAdminModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Ingresar al Panel Administrativo
            </button>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Arnold Enterprise Inc. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            <span>Prueba Técnica Full Stack</span>
            <span>•</span>
            <span className="text-slate-400">Migue Cordova</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
