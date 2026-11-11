import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Code, Cloud, ShieldCheck, Cpu, TrendingUp, LifeBuoy, Briefcase, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Code,
  Cloud,
  ShieldCheck,
  Cpu,
  TrendingUp,
  LifeBuoy,
  Briefcase
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.getServices();
        if (response.success) {
          setServices(response.data);
        } else {
          setError('No fue posible cargar el catálogo de servicios.');
        }
      } catch (err) {
        setError('Error al conectar con la API de servicios.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="servicios" className="py-24 lg:py-32 bg-slate-50/60 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        
        {/* Cabecera */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3.5 py-1.5 rounded-full border border-blue-200/50">
            Catálogo Corporativo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Nuestros Servicios Especializados
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Diseñamos soluciones tecnológicas adaptadas a cada fase de madurez de su organización, garantizando retorno de inversión y escalabilidad sostenida.
          </p>
        </div>

        {/* Estado de Carga */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
          </div>
        )}

        {/* Estado de Error */}
        {error && (
          <div className="max-w-md mx-auto p-4 bg-red-50 text-red-700 rounded-2xl text-center text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* Grid de Servicios a Ancho Completo */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service) => {
              const IconComponent = iconMap[service.icono] || Briefcase;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-default"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.nombre}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {service.descripcion}
                    </p>
                  </div>

                  <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span className="uppercase tracking-wider text-[11px] text-slate-400">Solución Enterprise</span>
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    >
                      Consultar <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
