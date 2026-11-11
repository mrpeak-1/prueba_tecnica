const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'arnold.db');
const db = new Database(dbPath);

// Activar claves foráneas y WAL mode para concurrencia
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function initDatabase() {
  // Crear tabla usuarios
  db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre VARCHAR(100) NOT NULL,
      correo VARCHAR(150) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      rol VARCHAR(20) NOT NULL DEFAULT 'admin',
      fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Crear tabla servicios
  db.exec(`
    CREATE TABLE IF NOT EXISTS servicios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre VARCHAR(150) NOT NULL,
      descripcion TEXT NOT NULL,
      icono VARCHAR(50) DEFAULT 'Briefcase',
      estado VARCHAR(20) NOT NULL DEFAULT 'activo',
      fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Crear tabla contactos
  db.exec(`
    CREATE TABLE IF NOT EXISTS contactos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre VARCHAR(100) NOT NULL,
      correo VARCHAR(150) NOT NULL,
      telefono VARCHAR(20) NOT NULL,
      mensaje TEXT NOT NULL,
      estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente',
      fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Semilla de Usuario Administrador (Migue Cordova)
  const checkAdmin = db.prepare('SELECT id FROM usuarios WHERE correo = ?').get('admin@arnold.com');
  if (!checkAdmin) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync('Admin123!', salt);
    db.prepare(`
      INSERT INTO usuarios (nombre, correo, password_hash, rol)
      VALUES (?, ?, ?, ?)
    `).run('Migue Cordova', 'admin@arnold.com', passwordHash, 'admin');
    console.log('✅ Usuario Administrador inicial creado: admin@arnold.com / Admin123! (Migue Cordova)');
  }

  // Semilla de Servicios Corporativos Arnold
  const countServices = db.prepare('SELECT COUNT(*) as count FROM servicios').get().count;
  if (countServices === 0) {
    const defaultServices = [
      {
        nombre: 'Desarrollo de Software a Medida',
        descripcion: 'Construcción de arquitecturas web y móviles robustas, escalables y seguras, diseñadas con metodologías ágiles de vanguardia.',
        icono: 'Code'
      },
      {
        nombre: 'Consultoría Cloud & DevOps',
        descripcion: 'Migración, orquestación y optimización de infraestructura en la nube (AWS, GCP, Azure) con integración y entrega continua (CI/CD).',
        icono: 'Cloud'
      },
      {
        nombre: 'Ciberseguridad & Auditoría',
        descripcion: 'Evaluación integral de vulnerabilidades, pruebas de penetración y cumplimiento normativo para blindar los activos digitales empresariales.',
        icono: 'ShieldCheck'
      },
      {
        nombre: 'Analítica de Datos & Inteligencia Artificial',
        descripcion: 'Implementación de pipelines de datos y modelos predictivos para transformar información operacional en decisiones estratégicas.',
        icono: 'Cpu'
      },
      {
        nombre: 'Transformación Digital Empresarial',
        descripcion: 'Modernización de procesos core de negocio mediante automatización inteligente y plataformas digitales de alto impacto.',
        icono: 'TrendingUp'
      },
      {
        nombre: 'Soporte & Mantenimiento 24/7',
        descripcion: 'Monitoreo proactivo, resolución de incidentes críticos y garantía de alta disponibilidad operacional para sus aplicaciones.',
        icono: 'LifeBuoy'
      }
    ];

    const insertService = db.prepare(`
      INSERT INTO servicios (nombre, descripcion, icono, estado)
      VALUES (?, ?, ?, 'activo')
    `);

    for (const s of defaultServices) {
      insertService.run(s.nombre, s.descripcion, s.icono);
    }
    console.log('✅ 6 Servicios iniciales sembrados en la base de datos.');
  }

  // Semilla de contactos de demostración
  const countContacts = db.prepare('SELECT COUNT(*) as count FROM contactos').get().count;
  if (countContacts === 0) {
    const insertContact = db.prepare(`
      INSERT INTO contactos (nombre, correo, telefono, mensaje, estado)
      VALUES (?, ?, ?, ?, ?)
    `);

    insertContact.run(
      'Carlos Rodríguez',
      'carlos.rodriguez@techcorp.com',
      '+51 987 654 321',
      'Estamos interesados en migrar nuestros servicios a la nube y requerimos una asesoría especializada con el equipo de Arnold.',
      'Pendiente'
    );
    insertContact.run(
      'María Elena Torres',
      'mtorres@finanzasplus.pe',
      '+51 912 345 678',
      'Requerimos una auditoría de ciberseguridad para nuestra plataforma transaccional de pagos.',
      'En Proceso'
    );
    insertContact.run(
      'Alejandro Gomez',
      'agomez@innova.org',
      '+51 998 877 665',
      'Solicitud de propuesta técnica para desarrollo de sistema ERP institucional.',
      'Atendido'
    );
    console.log('✅ Solicitudes de contacto demo sembradas.');
  }
}

initDatabase();

module.exports = db;

