import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Users, BarChart3, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Elemento de fondo decorativo */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              Liderazgo Tecnológico Empresarial
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Transformamos negocios con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">tecnología ágil</span> y segura.
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              En <strong className="text-slate-900">Arnold</strong> diseñamos e implementamos ecosistemas digitales escalables, arquitecturas de software de alto rendimiento y consultoría de vanguardia para impulsar el crecimiento corporativo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contacto"
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-3 group"
              >
                Iniciar Proyecto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#servicios"
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors text-center"
              >
                Explorar Soluciones
              </a>
            </div>

            {/* Badges de confianza */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-600">+99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-600">Seguridad ISO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-600">Soporte Continuo</span>
              </div>
            </div>
          </div>

          {/* Tarjeta Visual de Métricas / Hero Widget */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6 relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Rendimiento Operacional</h3>
                      <p className="text-xs text-slate-400">Monitoreo corporativo en tiempo real</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    Activo
                  </span>
                </div>

                {/* Métricas destacadas */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">Capacidad de Respuesta</p>
                      <p className="text-xl font-extrabold text-slate-800">&lt; 15 min</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">SLA Garantizado</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">Proyectos Implementados</p>
                      <p className="text-xl font-extrabold text-slate-800">140+ exitosos</p>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Corporativo</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">Líder de Desarrollo</p>
                      <p className="text-base font-bold text-slate-900">Migue Cordova</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">Full Stack</span>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-slate-400">
                  Arquitectura certificada de alto rendimiento y disponibilidad.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
