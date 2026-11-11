import React, { useState } from 'react';
import { api } from '../api';
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.nombre.trim()) {
      errs.nombre = 'El nombre completo es obligatorio.';
    } else if (formData.nombre.trim().length < 3) {
      errs.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      errs.correo = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(formData.correo.trim())) {
      errs.correo = 'Ingrese un correo electrónico válido.';
    }

    if (!formData.telefono.trim()) {
      errs.telefono = 'El teléfono de contacto es obligatorio.';
    } else if (formData.telefono.trim().length < 6) {
      errs.telefono = 'El teléfono debe contener al menos 6 dígitos.';
    }

    if (!formData.mensaje.trim()) {
      errs.mensaje = 'Por favor describa el requerimiento de su proyecto.';
    } else if (formData.mensaje.trim().length < 10) {
      errs.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error del campo
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setApiError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await api.createContact(formData);
      if (response.success) {
        setSuccessMessage(response.message || 'Solicitud enviada exitosamente.');
        setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });
      } else {
        setApiError(response.message || 'Error al enviar la solicitud.');
      }
    } catch (err) {
      setApiError('No se pudo conectar con el servidor. Intente nuevamente en unos instantes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna de Información */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Contáctenos
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Conversemos sobre su próximo desafío tecnológico
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed text-sm sm:text-base">
                Complete el formulario y nuestro equipo de consultores corporativos se pondrá en contacto en menos de 24 horas para coordinar una reunión de evaluación sin costo.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Correo Electrónico</h4>
                  <p className="text-sm text-slate-600">contacto@arnold.com</p>
                  <p className="text-xs text-slate-400">Atención técnica y comercial</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Línea Directa</h4>
                  <p className="text-sm text-slate-600">+51 (01) 780-9000</p>
                  <p className="text-xs text-slate-400">Lunes a Viernes de 8:30 AM a 6:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Oficinas Centrales</h4>
                  <p className="text-sm text-slate-600">Av. Javier Prado Este 4200, Lima, Perú</p>
                  <p className="text-xs text-slate-400">Centro Financiero Empresarial</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
              🔒 <strong>Privacidad Asegurada:</strong> La información remitida está amparada bajo nuestras políticas de confidencialidad y protección de datos corporativos.
            </div>
          </div>

          {/* Formulario Interactivo */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-8 sm:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Registrar Solicitud</h3>
            <p className="text-sm text-slate-500 mb-6">Por favor proporcione los datos solicitados para generar su requerimiento formal.</p>

            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {apiError && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.nombre ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                />
                {errors.nombre && <p className="text-xs text-rose-500 mt-1">{errors.nombre}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="juan.perez@empresa.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.correo ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                  />
                  {errors.correo && <p className="text-xs text-rose-500 mt-1">{errors.correo}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Teléfono Celular *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+51 987 654 321"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.telefono ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                  />
                  {errors.telefono && <p className="text-xs text-rose-500 mt-1">{errors.telefono}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mensaje o Requerimiento Técnico *
                </label>
                <textarea
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Detalle los objetivos del proyecto, plazos estimados o dudas específicas..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.mensaje ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                />
                {errors.mensaje && <p className="text-xs text-rose-500 mt-1">{errors.mensaje}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Solicitud
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
