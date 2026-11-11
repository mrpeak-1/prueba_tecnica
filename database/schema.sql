-- ====================================================================
-- PRUEBA TÉCNICA – INGENIERO DE SOFTWARE FULL STACK
-- Candidato: Migue Cordova
-- Empresa: Arnold
-- Script SQL de Creación de Base de Datos (Compatible con PostgreSQL / MySQL / SQLite)
-- ====================================================================

-- 1. Tabla de Usuarios (Administración y Acceso)
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- En PostgreSQL usar: SERIAL PRIMARY KEY
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'admin', -- 'admin', 'supervisor'
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Servicios Empresariales
CREATE TABLE IF NOT EXISTS servicios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    icono VARCHAR(50) DEFAULT 'Briefcase',
    estado VARCHAR(20) NOT NULL DEFAULT 'activo', -- 'activo', 'inactivo'
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Contactos (Solicitudes de Clientes)
CREATE TABLE IF NOT EXISTS contactos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    mensaje TEXT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente', -- 'Pendiente', 'En Proceso', 'Atendido', 'Rechazado'
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices recomendados para optimización de consultas y búsquedas
CREATE INDEX IF NOT EXISTS idx_contactos_estado ON contactos(estado);
CREATE INDEX IF NOT EXISTS idx_contactos_correo ON contactos(correo);
CREATE INDEX IF NOT EXISTS idx_usuarios_correo ON usuarios(correo);

