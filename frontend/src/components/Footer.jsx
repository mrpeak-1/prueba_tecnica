import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenAdminModal }) {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="w-full px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Marca corporativa */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">ARNOLD ENTERPRISE</span>
                <span className="block text-[10px] font-bold text-slate-500 tracking-widest uppercase">Tecnología & Consultoría</span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed font-normal">
              Soluciones integrales de software empresarial, consultoría cloud y ciberseguridad avanzada. Diseñado con estándares de alta disponibilidad y rendimiento sostenido.
            </p>
            <div className="pt-2 text-xs sm:text-sm text-slate-500">
              Desarrollado y sustentado por <strong className="text-slate-300 font-bold">Migue Cordova</strong> — Ingeniero de Software Full Stack.
            </div>
          </div>

          {/* Navegación */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Enlaces Corporativos</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#inicio" className="hover:text-blue-400 transition-colors">Inicio</a></li>
              <li><a href="#empresa" className="hover:text-blue-400 transition-colors">Acerca de Arnold</a></li>
              <li><a href="#servicios" className="hover:text-blue-400 transition-colors">Portafolio de Servicios</a></li>
              <li><a href="#contacto" className="hover:text-blue-400 transition-colors">Formulario de Contacto</a></li>
            </ul>
          </div>

          {/* Gestión y Acceso con botón flash */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Acceso Administrativo</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Módulo restringido para el equipo de operaciones y administración de solicitudes recibidas.
            </p>
            <button
              onClick={onOpenAdminModal}
              className="btn-flash inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-bold border border-slate-800 hover:border-slate-700 transition-all shadow-md group"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Ingresar al Panel Administrativo</span>
            </button>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Arnold Enterprise Inc. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2 font-medium">
            <span>Prueba Técnica Full Stack</span>
            <span>•</span>
            <span className="text-slate-300">Migue Cordova</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
