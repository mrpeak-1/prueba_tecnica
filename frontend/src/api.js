const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Autenticación
  login: async (correo, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    });
    return res.json();
  },

  // Servicios
  getServices: async () => {
    const res = await fetch(`${API_BASE}/services`);
    return res.json();
  },

  // Contactos (Público)
  createContact: async (contactData) => {
    const res = await fetch(`${API_BASE}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return res.json();
  },

  // Contactos (Admin / Protegido)
  getContacts: async (token, { search = '', estado = 'Todos' } = {}) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (estado && estado !== 'Todos') params.append('estado', estado);

    const res = await fetch(`${API_BASE}/contacts?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res.json();
  },

  getContactById: async (token, id) => {
    const res = await fetch(`${API_BASE}/contacts/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res.json();
  },

  updateContactStatus: async (token, id, estado) => {
    const res = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ estado })
    });
    return res.json();
  },

  deleteContact: async (token, id) => {
    const res = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res.json();
  },

  // Estadísticas del Dashboard
  getStats: async (token) => {
    const res = await fetch(`${API_BASE}/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res.json();
  }
};
