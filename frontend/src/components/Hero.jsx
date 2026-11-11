import React from 'react';
import { ArrowRight, Zap, BarChart3, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white w-full">
      {/* Luces difusas de fondo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Columna Izquierda: Texto Principal y Llamados a la Acción */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left flex flex-col justify-center">

            <div className="hero-anim-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide uppercase shadow-sm self-center lg:self-start">
              <Zap className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              Liderazgo Tecnológico Empresarial
            </div>

            <h1 className="hero-anim-item text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Transformamos negocios con{' '}
              <span className="text-aurora-shimmer">
                tecnología ágil y segura.
              </span>
            </h1>

            <p className="hero-anim-item text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              En <strong className="text-slate-900 font-bold">Arnold</strong> diseñamos e implementamos ecosistemas digitales escalables, arquitecturas de software de alto rendimiento y consultoría de vanguardia para impulsar el crecimiento corporativo.
            </p>

            <div className="hero-anim-item flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <a
                href="#contacto"
                className="btn-flash w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Iniciar Proyecto</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#servicios"
                className="btn-flash w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5 text-center"
              >
                <span>Explorar Soluciones</span>
              </a>
            </div>

            {/* Badges de confianza: Reposicionados en la parte inferior izquierda con espacio holgado */}
            <div className="hero-anim-item pt-12 mt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-700">+99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-700">Seguridad ISO</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-700">Soporte Continuo</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Rendimiento perfectamente balanceada verticalmente */}
          <div className="hero-anim-item lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-7 sm:p-9 space-y-6 relative z-10 transition-all duration-300 hover:shadow-blue-500/10 hover:border-blue-200 hover:-translate-y-1">

                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">Rendimiento Operacional</h3>
                      <p className="text-xs text-slate-400 font-medium">Monitoreo corporativo en tiempo real</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    Activo
                  </span>
                </div>

                {/* Métricas destacadas */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50/80 hover:bg-blue-50/50 rounded-2xl border border-slate-100 transition-colors flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capacidad de Respuesta</p>
                      <p className="text-2xl font-black text-slate-900 mt-0.5">menos de 15 min</p>
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-100/70 px-2.5 py-1 rounded-lg">SLA Garantizado</span>
                  </div>

                  <div className="p-4 bg-slate-50/80 hover:bg-blue-50/50 rounded-2xl border border-slate-100 transition-colors flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Proyectos Implementados</p>
                      <p className="text-2xl font-black text-slate-900 mt-0.5">140+ exitosos</p>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-100/70 px-2.5 py-1 rounded-lg">Corporativo</span>
                  </div>

                  <div className="p-4 bg-slate-50/80 hover:bg-blue-50/50 rounded-2xl border border-slate-100 transition-colors flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Líder de Desarrollo</p>
                      <p className="text-lg font-black text-slate-900 mt-0.5">Migue Cordova</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">Full Stack</span>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-slate-400 font-medium">
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
