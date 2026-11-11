import React, { useState, useEffect } from 'react';
import { api } from '../api';
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Trash2,
  RefreshCw,
  LogOut,
  Mail,
  Phone,
  Building2,
} from 'lucide-react';

export default function AdminDashboard({ user, token, onLogout, onBackToSite }) {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('Todos');
  const [actionMessage, setActionMessage] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [contactsRes, statsRes] = await Promise.all([
        api.getContacts(token, { search, estado: estadoFilter }),
        api.getStats(token)
      ]);

      if (contactsRes.success) {
        setContacts(contactsRes.data);
      }
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Error al cargar datos del dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [estadoFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleStatusChange = async (id, nuevoEstado) => {
    setUpdatingId(id);
    try {
      const res = await api.updateContactStatus(token, id, nuevoEstado);
      if (res.success) {
        setActionMessage(`Estado de la solicitud #${id} actualizado a "${nuevoEstado}".`);
        setContacts(contacts.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c));
        const statsRes = await api.getStats(token);
        if (statsRes.success) setStats(statsRes.data);
      }
    } catch (err) {
      alert('Error al actualizar el estado.');
    } finally {
      setUpdatingId(null);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`¿Está seguro de eliminar permanentemente la solicitud #${id}? Esta acción requiere autorización de administrador.`)) {
      return;
    }

    try {
      const res = await api.deleteContact(token, id);
      if (res.success) {
        setActionMessage(`Solicitud #${id} eliminada correctamente.`);
        setContacts(contacts.filter(c => c.id !== id));
        const statsRes = await api.getStats(token);
        if (statsRes.success) setStats(statsRes.data);
      }
    } catch (err) {
      alert('Error al eliminar la solicitud.');
    } finally {
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-800">
      
      {/* Barra Superior del Panel a Ancho Completo */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-sm w-full">
        <div className="w-full px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-black text-slate-900 text-xl leading-tight">Panel Administrativo</h1>
              <p className="text-xs text-slate-400 font-medium">Empresa Arnold | Módulo de Solicitudes Corporativas</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSite}
              className="text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200"
            >
              Ver Portal Web
            </button>
            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shadow-inner">
                MC
              </div>
              <div className="text-left">
                <span className="block text-xs font-black text-slate-800">{user?.nombre || 'Migue Cordova'}</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">{user?.rol || 'Administrador'}</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="w-full px-6 sm:px-10 lg:px-16 py-10 space-y-8">
        
        {/* Banner de Bienvenida y Autor a Ancho Completo */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Control Central Operacional</span>
            <h2 className="text-2xl sm:text-4xl font-black mt-1">Gestión Corporativa de Contactos</h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal">
              Supervisión en tiempo real de leads, estado de atención y métricas de captación.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-xs">
            <span className="text-blue-300 block font-medium">Ingeniero a cargo:</span>
            <strong className="text-white text-base font-bold">Migue Cordova</strong>
          </div>
        </div>

        {/* Tarjetas de Estadísticas (KPIs) */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Solicitudes</span>
                <Users className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">{stats.totalSolicitudes}</p>
              <span className="text-xs text-slate-400 font-medium">Registros acumulados</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Pendientes</span>
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-amber-600 mt-3">{stats.pendientes}</p>
              <span className="text-xs text-amber-600/80 font-medium">Por revisar</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">En Proceso</span>
                <RefreshCw className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-blue-600 mt-3">{stats.enProceso}</p>
              <span className="text-xs text-blue-600/80 font-medium">En negociación</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Atendidos</span>
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-600 mt-3">{stats.atendidos}</p>
              <span className="text-xs text-emerald-600/80 font-medium">Completados</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Rechazados</span>
                <XCircle className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-rose-600 mt-3">{stats.rechazados}</p>
              <span className="text-xs text-rose-600/80 font-medium">Desestimados</span>
            </div>

          </div>
        )}

        {/* Notificación de acción */}
        {actionMessage && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-800 text-sm font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage(null)} className="text-blue-500 hover:text-blue-700">✕</button>
          </div>
        )}

        {/* Contenedor Principal: Filtros y Tabla a Ancho Completo */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* Barra de Filtros y Búsqueda */}
          <div className="p-6 border-b border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/60">
            
            {/* Formulario de Búsqueda */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
              />
            </form>

            {/* Filtros por Estado */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filtrar:</span>
              <div className="flex flex-wrap gap-2">
                {['Todos', 'Pendiente', 'En Proceso', 'Atendido', 'Rechazado'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setEstadoFilter(st)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      estadoFilter === st
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={loadData}
                className="ml-auto p-2.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-xl border border-slate-200 transition-all shadow-sm"
                title="Actualizar tabla"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
              </button>
            </div>

          </div>

          {/* Tabla de Resultados */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Cliente / Contacto</th>
                  <th className="py-4 px-6">Teléfono</th>
                  <th className="py-4 px-6">Mensaje / Requerimiento</th>
                  <th className="py-4 px-6">Fecha</th>
                  <th className="py-4 px-6">Estado</th>
                  <th className="py-4 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {contacts.length === 0 && !loading && (
                  <tr>
                    <td colSpan="7" className="py-16 text-center text-slate-400 font-medium">
                      No se encontraron solicitudes registradas con los filtros aplicados.
                    </td>
                  </tr>
                )}

                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-800 text-xs">
                      #{c.id}
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-sm">{c.nombre}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5 font-medium">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {c.correo}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs font-semibold text-slate-700 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {c.telefono}
                      </div>
                    </td>

                    <td className="py-4 px-6 max-w-sm text-xs text-slate-600">
                      <p className="line-clamp-2" title={c.mensaje}>
                        {c.mensaje}
                      </p>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-400 whitespace-nowrap font-medium">
                      {new Date(c.fecha_registro).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <select
                        value={c.estado}
                        disabled={updatingId === c.id}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className="text-xs font-bold rounded-xl px-3 py-1.5 border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer shadow-sm"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Atendido">Atendido</option>
                        <option value="Rechazado">Rechazado</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Eliminar solicitud permanentemente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer de la Tabla */}
          <div className="p-6 border-t border-slate-200 bg-slate-50/60 text-xs text-slate-500 flex items-center justify-between font-medium">
            <span>Total mostrados: <strong>{contacts.length}</strong> solicitudes</span>
            <span>Sistema auditado por: <strong>Migue Cordova</strong></span>
          </div>

        </div>

      </main>

    </div>
  );
}
