# 🏢 Arnold Enterprise - Plataforma Web Corporativa & Panel Administrativo

> **Prueba Técnica – Ingeniero de Software Full Stack**  
> **Candidato:** Migue Cordova  

---

## 📌 1. Descripción del Proyecto
Plataforma web empresarial desarrollada para la empresa **Arnold**, orientada a presentar su identidad corporativa, exhibir su portafolio de servicios tecnológicos de alto nivel, captar solicitudes de potenciales clientes mediante un formulario validado y administrar integralmente dichas solicitudes a través de un **Panel Administrativo seguro con autenticación JWT y métricas en tiempo real**.

---

## ⚡ 2. Arquitectura & Stack Tecnológico Ágil

| Capa | Tecnología Seleccionada | Justificación Técnica de Velocidad y Eficiencia |
| :--- | :--- | :--- |
| **Frontend** | **React + Vite** | Entorno de desarrollo ultrarrápido con Hot Module Replacement (HMR) instantáneo y compilación optimizada en producción. |
| **Diseño UI/UX** | **Tailwind CSS + Lucide Icons** | Desarrollo ágil de interfaz moderna, responsiva y corporativa sin sobrecosto de mantenimiento de CSS monolítico. |
| **Backend** | **Node.js + Express** | API REST ligera, modular, con middlewares de seguridad, CORS y validaciones de esquema estrictas. |
| **Base de Datos** | **SQLite Relacional (better-sqlite3)** | Base de datos relacional integrada de cero fricción con integridad referencial, claves foráneas y modo WAL de alto rendimiento. |
| **Script SQL** | **PostgreSQL / MySQL Compatible** | Script estándar `database/schema.sql` listo para desplegar en motores relacionales empresariales. |
| **Seguridad** | **bcryptjs + JWT** | Hashing criptográfico de contraseñas y autorización basada en tokens con control de roles (`admin`). |

---

## 📁 3. Estructura del Proyecto

```plaintext
prueba_tecnica/
├── backend/
│   ├── .env                    # Variables de entorno activas
│   ├── .env.example            # Plantilla de variables de entorno
│   ├── authMiddleware.js       # Middleware de autenticación JWT y control RBAC
│   ├── db.js                   # Inicialización SQLite y semillas de datos automáticas
│   ├── package.json            # Dependencias del servidor Node.js
│   ├── server.js               # Servidor Express y API REST completa
│   └── arnold.db               # Base de datos relacional SQLite generada
├── frontend/
│   ├── index.html              # Entrypoint HTML5 con Tailwind y tipografía corporativa
│   ├── package.json            # Dependencias de React y Vite
│   ├── vite.config.js          # Configuración de empaquetado Vite
│   └── src/
│       ├── api.js              # Cliente HTTP centralizado para interactuar con la API
│       ├── App.jsx             # Orquestador principal y control de sesión
│       ├── main.jsx            # Punto de montaje React
│       └── components/
│           ├── Navbar.jsx          # Menú de navegación responsive
│           ├── Hero.jsx            # Banner principal corporativo con KPIs
│           ├── About.jsx           # Sección Nosotros, Misión, Visión y Equipo
│           ├── Services.jsx        # Grid de servicios dinámicos desde API
│           ├── Contact.jsx         # Formulario de contacto con validaciones
│           ├── Footer.jsx          # Pie de página corporativo
│           ├── LoginModal.jsx      # Modal de inicio de sesión administrativo
│           └── AdminDashboard.jsx  # Panel de gestión, búsqueda, filtros y métricas
├── database/
│   └── schema.sql              # Script SQL de creación de tablas e índices (PostgreSQL / MySQL)
├── docs/
│   └── preguntas_sustentacion.md # Respuestas completas a las 15 preguntas teóricas
└── README.md                   # Documentación técnica y manual de ejecución
```

---

## 🛠️ 4. Guía de Instalación y Ejecución Rápida

### Requisitos Previos:
- **Node.js** v18+ instalado.
- **npm** v9+ instalado.

### Paso 1: Levantar el Backend (API REST)
En una terminal:
```bash
cd backend
npm install
node server.js
```
El servidor quedará disponible en: `http://localhost:5000`

### Paso 2: Levantar el Frontend (React + Vite)
En otra terminal paralela:
```bash
cd frontend
npm install
npm run dev
```
La aplicación web quedará disponible en el navegador en: `http://localhost:5173`

---

## 🔐 5. Credenciales de Acceso al Panel Administrativo

Para evaluar el **Ejercicio 4 (Panel Administrativo)** y **Ejercicio 5 (Seguridad)**:
- **URL de Acceso:** En la barra de navegación o pie de página presionar **"Panel Admin"**
- **Correo:** `admin@arnold.com`
- **Contraseña:** `Admin123!`
- **Usuario Responsable:** Migue Cordova (Rol: Administrador)

---

## 🌐 6. Endpoints de la API REST

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Público | Comprobación de estado y versión del sistema |
| **POST** | `/api/auth/login` | Público | Autenticación y generación de token JWT |
| **GET** | `/api/services` | Público | Listar servicios activos en la web corporativa |
| **POST** | `/api/services` | Admin | Registrar nuevo servicio corporativo |
| **POST** | `/api/contacts` | Público | Registrar solicitud de contacto con validación |
| **GET** | `/api/contacts` | Protegido | Listar contactos con soporte de búsqueda y filtro por estado |
| **GET** | `/api/contacts/:id` | Protegido | Consultar detalle de una solicitud por ID |
| **PUT** | `/api/contacts/:id` | Protegido | Actualizar estado de la solicitud (`Pendiente`, `En Proceso`, `Atendido`, `Rechazado`) |
| **DELETE** | `/api/contacts/:id` | Admin | Eliminar permanentemente un registro de solicitud |
| **GET** | `/api/dashboard/stats` | Protegido | Obtener métricas consolidadas del panel |

---

## 📝 7. Sustentación Técnica
Las respuestas detalladas a las 15 preguntas de sustentación requeridas por el comité de evaluación se encuentran documentadas en:
👉 [`docs/preguntas_sustentacion.md`](docs/preguntas_sustentacion.md)

