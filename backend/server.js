require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const { authMiddleware, requireRole, JWT_SECRET } = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS y Parser JSON
app.use(cors({
  origin: '*', // Permite solicitudes del frontend en desarrollo
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ==========================================
// 1. ENDPOINTS DE AUTENTICACIÓN
// ==========================================

// Iniciar sesión
app.post('/api/auth/login', (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ success: false, message: 'Correo y contraseña son requeridos.' });
    }

    const usuario = db.prepare('SELECT * FROM usuarios WHERE correo = ?').get(correo.trim().toLowerCase());
    if (!usuario) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
    }

    const passwordMatch = bcrypt.compareSync(password, usuario.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en /api/auth/login:', error);
    return res.status(500).json({ success: false, message: 'Error interno en el servidor.' });
  }
});

// Perfil de usuario autenticado
app.get('/api/auth/profile', authMiddleware, (req, res) => {
  const usuario = db.prepare('SELECT id, nombre, correo, rol, fecha_registro FROM usuarios WHERE id = ?').get(req.user.id);
  if (!usuario) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
  }
  return res.json({ success: true, usuario });
});

// ==========================================
// 2. ENDPOINTS DE SERVICIOS (/api/services)
// ==========================================

// GET /api/services: Listar servicios disponibles
app.get('/api/services', (req, res) => {
  try {
    const servicios = db.prepare("SELECT * FROM servicios WHERE estado = 'activo' ORDER BY id ASC").all();
    return res.json({ success: true, data: servicios });
  } catch (error) {
    console.error('Error al consultar servicios:', error);
    return res.status(500).json({ success: false, message: 'Error al consultar servicios.' });
  }
});

// POST /api/services: Registrar nuevo servicio (Admin)
app.post('/api/services', authMiddleware, requireRole('admin'), (req, res) => {
  try {
    const { nombre, descripcion, icono } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).json({ success: false, message: 'Nombre y descripción son requeridos.' });
    }

    const info = db.prepare(`
      INSERT INTO servicios (nombre, descripcion, icono, estado)
      VALUES (?, ?, ?, 'activo')
    `).run(nombre.trim(), descripcion.trim(), icono || 'Briefcase');

    const nuevoServicio = db.prepare('SELECT * FROM servicios WHERE id = ?').get(info.lastInsertRowid);
    return res.status(201).json({ success: true, message: 'Servicio creado exitosamente.', data: nuevoServicio });
  } catch (error) {
    console.error('Error al registrar servicio:', error);
    return res.status(500).json({ success: false, message: 'Error al registrar servicio.' });
  }
});

// ==========================================
// 3. ENDPOINTS DE CONTACTOS (/api/contacts)
// ==========================================

// POST /api/contacts: Registrar solicitud de contacto (Público)
app.post('/api/contacts', (req, res) => {
  try {
    const { nombre, correo, telefono, mensaje } = req.body;

    // Validaciones estrictas
    if (!nombre || !correo || !telefono || !mensaje) {
      return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({ success: false, message: 'El formato de correo electrónico no es válido.' });
    }

    if (telefono.trim().length < 6) {
      return res.status(400).json({ success: false, message: 'El teléfono debe contener al menos 6 caracteres numéricos.' });
    }

    if (mensaje.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'El mensaje debe contener al menos 10 caracteres explicativos.' });
    }

    const stmt = db.prepare(`
      INSERT INTO contactos (nombre, correo, telefono, mensaje, estado)
      VALUES (?, ?, ?, ?, 'Pendiente')
    `);

    const result = stmt.run(nombre.trim(), correo.trim().toLowerCase(), telefono.trim(), mensaje.trim());
    const contactoCreado = db.prepare('SELECT * FROM contactos WHERE id = ?').get(result.lastInsertRowid);

    return res.status(201).json({
      success: true,
      message: '¡Gracias por contactar con Arnold! Su solicitud ha sido registrada exitosamente. Un asesor se comunicará a la brevedad.',
      data: contactoCreado
    });
  } catch (error) {
    console.error('Error al registrar contacto:', error);
    return res.status(500).json({ success: false, message: 'Ocurrió un error al procesar su solicitud.' });
  }
});

// GET /api/contacts: Listar solicitudes registradas (Protegido - Admin/Supervisor)
// Soporta búsqueda por nombre o correo (?search=...) y filtro por estado (?estado=...)
app.get('/api/contacts', authMiddleware, (req, res) => {
  try {
    const { search, estado } = req.query;

    let query = 'SELECT * FROM contactos WHERE 1=1';
    const params = [];

    if (estado && estado !== 'Todos') {
      query += ' AND estado = ?';
      params.push(estado);
    }

    if (search && search.trim() !== '') {
      query += ' AND (nombre LIKE ? OR correo LIKE ?)';
      params.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }

    query += ' ORDER BY id DESC';

    const contactos = db.prepare(query).all(...params);
    return res.json({ success: true, count: contactos.length, data: contactos });
  } catch (error) {
    console.error('Error al listar contactos:', error);
    return res.status(500).json({ success: false, message: 'Error al consultar contactos.' });
  }
});

// GET /api/contacts/:id: Consultar contacto por identificador (Protegido)
app.get('/api/contacts/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const contacto = db.prepare('SELECT * FROM contactos WHERE id = ?').get(id);

    if (!contacto) {
      return res.status(404).json({ success: false, message: 'Contacto no encontrado con el identificador proporcionado.' });
    }

    return res.json({ success: true, data: contacto });
  } catch (error) {
    console.error('Error al buscar contacto:', error);
    return res.status(500).json({ success: false, message: 'Error interno al consultar el contacto.' });
  }
});

// PUT /api/contacts/:id: Actualizar estado de solicitud (Protegido)
app.put('/api/contacts/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { estado, mensaje } = req.body;

    const contactoExistente = db.prepare('SELECT * FROM contactos WHERE id = ?').get(id);
    if (!contactoExistente) {
      return res.status(404).json({ success: false, message: 'Solicitud de contacto no encontrada.' });
    }

    const nuevoEstado = estado || contactoExistente.estado;
    const nuevoMensaje = mensaje || contactoExistente.mensaje;

    const estadosValidos = ['Pendiente', 'En Proceso', 'Atendido', 'Rechazado'];
    if (estado && !estadosValidos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: `Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`
      });
    }

    db.prepare(`
      UPDATE contactos
      SET estado = ?, mensaje = ?
      WHERE id = ?
    `).run(nuevoEstado, nuevoMensaje, id);

    const contactoActualizado = db.prepare('SELECT * FROM contactos WHERE id = ?').get(id);
    return res.json({
      success: true,
      message: 'Solicitud actualizada correctamente.',
      data: contactoActualizado
    });
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    return res.status(500).json({ success: false, message: 'Error al actualizar el contacto.' });
  }
});

// DELETE /api/contacts/:id: Eliminar registro mediante autorización (Protegido - Admin)
app.delete('/api/contacts/:id', authMiddleware, requireRole('admin'), (req, res) => {
  try {
    const { id } = req.params;
    const contacto = db.prepare('SELECT * FROM contactos WHERE id = ?').get(id);

    if (!contacto) {
      return res.status(404).json({ success: false, message: 'Contacto no encontrado.' });
    }

    db.prepare('DELETE FROM contactos WHERE id = ?').run(id);

    return res.json({
      success: true,
      message: `Solicitud de contacto #${id} eliminada con éxito por autorización del administrador.`
    });
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    return res.status(500).json({ success: false, message: 'Error al eliminar el contacto.' });
  }
});

// ==========================================
// 4. ENDPOINT DE ESTADÍSTICAS DEL DASHBOARD
// ==========================================
app.get('/api/dashboard/stats', authMiddleware, (req, res) => {
  try {
    const totalSolicitudes = db.prepare('SELECT COUNT(*) as total FROM contactos').get().total;
    const pendientes = db.prepare("SELECT COUNT(*) as total FROM contactos WHERE estado = 'Pendiente'").get().total;
    const enProceso = db.prepare("SELECT COUNT(*) as total FROM contactos WHERE estado = 'En Proceso'").get().total;
    const atendidos = db.prepare("SELECT COUNT(*) as total FROM contactos WHERE estado = 'Atendido'").get().total;
    const rechazados = db.prepare("SELECT COUNT(*) as total FROM contactos WHERE estado = 'Rechazado'").get().total;
    const totalServicios = db.prepare("SELECT COUNT(*) as total FROM servicios WHERE estado = 'activo'").get().total;

    return res.json({
      success: true,
      data: {
        totalSolicitudes,
        pendientes,
        enProceso,
        atendidos,
        rechazados,
        totalServicios
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return res.status(500).json({ success: false, message: 'Error al cargar estadísticas.' });
  }
});

// Ruta de comprobación de salud del backend
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'Arnold Enterprise API',
    author: 'Migue Cordova',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Arnold Enterprise Backend corriendo en http://localhost:${PORT}`);
  console.log(`👤 Autor & Líder Técnico: Migue Cordova`);
});

