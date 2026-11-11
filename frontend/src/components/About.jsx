import React from 'react';
import { Target, Award, HeartHandshake } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      title: 'Misión',
      desc: 'Proveer soluciones tecnológicas sólidas, innovadoras y seguras que optimicen la productividad y aceleren la evolución digital de nuestros clientes.',
      icon: Target
    },
    {
      title: 'Visión',
      desc: 'Ser el socio estratégico de referencia internacional en arquitectura de software, nube y ciberseguridad, reconocido por nuestra agilidad y excelencia.',
      icon: Award
    },
    {
      title: 'Valores Corporativos',
      desc: 'Integridad irrestricta, innovación continua, compromiso con el resultado del cliente y calidad técnica rigurosa en cada línea de código.',
      icon: HeartHandshake
    }
  ];

  return (
    <section id="empresa" className="py-24 lg:py-32 bg-white border-y border-slate-100 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        
        {/* Cabecera de sección */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Acerca de Nosotros
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Ingeniería de vanguardia respaldada por experiencia real
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Fundada con el firme propósito de crear tecnología que resuelva problemas complejos de negocio, en <strong>Arnold</strong> combinamos metodologías ágiles con los estándares más estrictos de seguridad y escalabilidad.
          </p>
        </div>

        {/* Pilares con hover interactivo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 hover:bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Banner institucional del equipo con botón flash */}
        <div className="mt-20 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-blue-400 font-bold text-xs tracking-widest uppercase">Liderazgo & Talento</span>
            <h3 className="text-2xl sm:text-4xl font-black">Dirección Técnica: Migue Cordova</h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Garantizamos soluciones robustas utilizando las mejores prácticas de la industria: microservicios, seguridad perimetral, tests automáticos y arquitecturas cloud-native.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#contacto"
              className="btn-flash px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 inline-block"
            >
              <span>Contactar al Equipo</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
