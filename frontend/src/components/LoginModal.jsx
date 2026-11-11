import React, { useEffect, useState, useRef } from 'react';
import { api } from '../api';
import { Lock, Mail, Key, AlertCircle, X, Sparkles } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [error, setError] = useState(null);
  const isTypingRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setCorreo('');
      setPassword('');
      setError(null);
      setIsAutoTyping(false);
      isTypingRef.current = false;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const performLogin = async (emailToSubmit, passwordToSubmit) => {
    setError(null);
    setLoading(true);

    try {
      const res = await api.login(emailToSubmit, passwordToSubmit);
      if (res.success && res.token) {
        onLoginSuccess(res.token, res.usuario);
        onClose();
      } else {
        setError(res.message || 'Credenciales incorrectas.');
      }
    } catch (err) {
      setError('Error al comunicar con el servidor de autenticación.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAutoTyping) return;
    performLogin(correo, password);
  };

  const handleAutoTypeAndLogin = () => {
    if (isAutoTyping || loading) return;

    setIsAutoTyping(true);
    isTypingRef.current = true;
    setError(null);
    setCorreo('');
    setPassword('');

    const targetEmail = 'admin@arnold.com';
    const targetPass = 'Admin123!';

    let emailIndex = 0;
    const typeEmailInterval = setInterval(() => {
      if (!isTypingRef.current) {
        clearInterval(typeEmailInterval);
        return;
      }
      if (emailIndex <= targetEmail.length) {
        setCorreo(targetEmail.slice(0, emailIndex));
        emailIndex++;
      } else {
        clearInterval(typeEmailInterval);

        setTimeout(() => {
          if (!isTypingRef.current) return;
          let passIndex = 0;
          const typePassInterval = setInterval(() => {
            if (!isTypingRef.current) {
              clearInterval(typePassInterval);
              return;
            }
            if (passIndex <= targetPass.length) {
              setPassword(targetPass.slice(0, passIndex));
              passIndex++;
            } else {
              clearInterval(typePassInterval);
              setIsAutoTyping(false);
              setTimeout(() => {
                performLogin(targetEmail, targetPass);
              }, 400);
            }
          }, 60);
        }, 200);
      }
    }, 45);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-10 overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Botón Cerrar (X) & Tecla ESC hint */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 tracking-wider">ESC</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            title="Cerrar modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cabecera */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner ring-4 ring-blue-50">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Acceso Administrativo</h3>
          <p className="text-xs text-slate-500 mt-1">Gestión corporativa Arnold Enterprise</p>
        </div>

        {/* Botón de Autologin con efecto Flash */}
        <button
          type="button"
          onClick={handleAutoTypeAndLogin}
          disabled={isAutoTyping || loading}
          className="btn-flash w-full mb-6 py-3 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70"
        >
          {isAutoTyping ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Escribiendo credenciales e ingresando...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Ingresar de Frente (Auto-Completar y Entrar)</span>
            </>
          )}
        </button>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Correo Corporativo
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                disabled={isAutoTyping}
                placeholder="admin@arnold.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                disabled={isAutoTyping}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || isAutoTyping}
            className="btn-flash w-full mt-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <span>Iniciar Sesión Manual</span>
            )}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Seguridad: Hash + Token</span>
          <span className="font-semibold text-slate-600">Migue Cordova</span>
        </div>

      </div>
    </div>
  );
}
