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
  Calendar,
  Building2,
  TrendingUp,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboard({ user, token, onLogout, onBackToSite }) {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('Todos');
  const [actionMessage, setActionMessage] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
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
        // Actualizar en memoria inmediatamente
        setContacts(contacts.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c));
        // Refrescar estadísticas
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

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Pendiente</span>;
      case 'En Proceso':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">En Proceso</span>;
      case 'Atendido':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Atendido</span>;
      case 'Rechazado':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Rechazado</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">{estado}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      
      {/* Barra Superior del Panel */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg leading-tight">Panel Administrativo</h1>
              <p className="text-xs text-slate-400">Empresa Arnold | Módulo de Solicitudes</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSite}
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Ver Sitio Web
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                MC
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-800">{user?.nombre || 'Migue Cordova'}</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{user?.rol || 'Administrador'}</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner de Bienvenida y Autor */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Control Central</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">Gestión Corporativa de Contactos</h2>
            <p className="text-sm text-slate-300 mt-1">
              Supervisión en tiempo real de leads, estado de atención y métricas de captación.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs">
            <span className="text-blue-200 block">Ingeniero a cargo:</span>
            <strong className="text-white text-sm">Migue Cordova</strong>
          </div>
        </div>

        {/* Tarjetas de Estadísticas (KPIs) */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Solicitudes</span>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-3xl font-black text-slate-900 mt-3">{stats.totalSolicitudes}</p>
              <span className="text-[11px] text-slate-400">Registros acumulados</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 uppercase">Pendientes</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-3xl font-black text-amber-600 mt-3">{stats.pendientes}</p>
              <span className="text-[11px] text-amber-600/80">Por revisar</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase">En Proceso</span>
                <RefreshCw className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-3xl font-black text-blue-600 mt-3">{stats.enProceso}</p>
              <span className="text-[11px] text-blue-600/80">En negociación</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase">Atendidos</span>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-black text-emerald-600 mt-3">{stats.atendidos}</p>
              <span className="text-[11px] text-emerald-600/80">Completados</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-700 uppercase">Rechazados</span>
                <XCircle className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-3xl font-black text-rose-600 mt-3">{stats.rechazados}</p>
              <span className="text-[11px] text-rose-600/80">Desestimados</span>
            </div>

          </div>
        )}

        {/* Notificación de acción */}
        {actionMessage && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-sm flex items-center justify-between shadow-sm animate-fade-in">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage(null)} className="text-blue-500 hover:text-blue-700">✕</button>
          </div>
        )}

        {/* Contenedor Principal: Filtros y Tabla */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Barra de Filtros y Búsqueda */}
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/50">
            
            {/* Formulario de Búsqueda */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
            </form>

            {/* Filtros por Estado */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">Filtrar:</span>
              <div className="flex flex-wrap gap-1.5">
                {['Todos', 'Pendiente', 'En Proceso', 'Atendido', 'Rechazado'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setEstadoFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      estadoFilter === st
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={loadData}
                className="ml-auto p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg border border-slate-200 transition-colors"
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
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Cliente / Contacto</th>
                  <th className="py-3 px-4">Teléfono</th>
                  <th className="py-3 px-4">Mensaje / Requerimiento</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {contacts.length === 0 && !loading && (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-400">
                      No se encontraron solicitudes registradas con los filtros aplicados.
                    </td>
                  </tr>
                )}

                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-800 text-xs">
                      #{c.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{c.nombre}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {c.correo}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {c.telefono}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs text-xs text-slate-600">
                      <p className="line-clamp-2" title={c.mensaje}>
                        {c.mensaje}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(c.fecha_registro).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={c.estado}
                        disabled={updatingId === c.id}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className="text-xs font-semibold rounded-lg px-2 py-1 border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Atendido">Atendido</option>
                        <option value="Rechazado">Rechazado</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 text-xs text-slate-500 flex items-center justify-between">
            <span>Total mostrados: <strong>{contacts.length}</strong> solicitudes</span>
            <span>Sistema auditado por: <strong>Migue Cordova</strong></span>
          </div>

        </div>

      </main>

    </div>
  );
}
