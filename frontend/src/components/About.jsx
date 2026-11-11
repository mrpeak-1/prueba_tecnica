import React from 'react';
import { Target, Award, Rocket, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';

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
    <section id="empresa" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de sección */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Acerca de Nosotros
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ingeniería de vanguardia respaldada por experiencia real
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Fundada con el firme propósito de crear tecnología que resuelva problemas complejos de negocio, en <strong>Arnold</strong> combinamos metodologías ágiles con los estándares más estrictos de seguridad y escalabilidad.
          </p>
        </div>

        {/* Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-2xl p-8 border border-slate-200/80 hover:border-blue-500/30 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Banner institucional del equipo */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-blue-400 font-semibold text-xs tracking-wider uppercase">Liderazgo & Talento</span>
            <h3 className="text-2xl sm:text-3xl font-bold">Dirección Técnica: Migue Cordova</h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Garantizamos soluciones robustas utilizando las mejores prácticas de la industria: microservicios, seguridad perimetral, tests automáticos y arquitecturas cloud-native.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#contacto"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md"
            >
              Contactar al Equipo
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
