# 📚 Respuestas a Preguntas de Sustentación Técnica
**Candidato:** Migue Cordova  
**Puesto:** Ingeniero de Software Full Stack  
**Proyecto:** Plataforma Corporativa y Panel de Control - Empresa Arnold  

---

### 1. ¿Cuál es la diferencia entre frontend y backend?
- **Frontend (Lado del Cliente):** Es la capa visible e interactiva de la aplicación con la que interactúa el usuario final en su navegador o dispositivo móvil. Se enfoca en la experiencia de usuario (UX), diseño visual (UI), accesibilidad y rendimiento en el cliente. En este proyecto se desarrolló con **React + Vite + Tailwind CSS**.
- **Backend (Lado del Servidor):** Es la capa lógica y de procesamiento de datos que se ejecuta en el servidor. Se encarga de la lógica de negocio, autenticación, autorización, validación estricta de seguridad, procesamiento de reglas y comunicación con la base de datos. En este proyecto se implementó con **Node.js + Express**.

---

### 2. ¿Por qué utilizarías React para desarrollar una aplicación empresarial?
1. **Arquitectura basada en componentes modulares y reutilizables:** Facilita la división de pantallas complejas (ej. Navbar, Hero, ContactForm, AdminDashboard) en piezas independientes y mantenibles.
2. **Virtual DOM y Alto Rendimiento:** React optimiza el renderizado actualizando únicamente los nodos del árbol DOM que cambian, reduciendo el costo computacional en navegadores.
3. **Ecosistema maduro y estándar de la industria:** Cuenta con el soporte más amplio de librerías (iconos con Lucide, gestión de estado, hooks reactivos como `useState`, `useEffect`).
4. **Mantenibilidad y Escalabilidad:** Su tipado y flujo de datos unidireccional (*One-Way Data Binding*) hace predecible el comportamiento de las aplicaciones corporativas.

---

### 3. ¿Qué es una API REST y cómo funciona?
Una **API REST (Representational State Transfer)** es un estilo de arquitectura de software para sistemas hipermedia distribuidos. Funciona mediante el protocolo sin estado (**stateless**) HTTP:
- Cada recurso (ej. `/api/contacts`, `/api/services`) se identifica mediante una **URI** unívoca.
- La comunicación se efectúa enviando y recibiendo datos estructurados en formato **JSON**.
- Cada petición viaja con sus credenciales (como encabezados `Authorization: Bearer <token>`) y el servidor responde con códigos de estado HTTP estandarizados (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error).

---

### 4. ¿Cuál es la diferencia entre GET, POST, PUT y DELETE?
- **GET:** Operación de solo lectura (segura e idempotente). Recupera información sin alterar el estado del servidor (ej. `GET /api/services`).
- **POST:** Operación de creación no idempotente. Envía datos en el cuerpo (`body`) para crear un nuevo registro o iniciar una acción (ej. `POST /api/contacts` para registrar una solicitud).
- **PUT:** Operación de reemplazo o actualización completa de un recurso existente (idempotente). En nuestro caso, `PUT /api/contacts/:id` actualiza el estado de la solicitud.
- **DELETE:** Operación para remover o eliminar un recurso existente del servidor (idempotente). En el proyecto, `DELETE /api/contacts/:id` requiere privilegios de administrador.

---

### 5. ¿Qué diferencia existe entre una base de datos SQL y NoSQL?
| Criterio | Bases de Datos SQL (Relacionales) | Bases de Datos NoSQL (No Relacionales) |
| :--- | :--- | :--- |
| **Estructura** | Esquema rígido y tabular (Tablas, Filas, Columnas). | Sin esquema rígido (Documentos JSON, Clave-Valor, Grafos). |
| **Integridad** | Cumplimiento estricto de **ACID** (Atomicidad, Consistencia, Aislamiento, Durabilidad). | Generalmente modelo **BASE** (Eventual Consistency). |
| **Relaciones** | Manejo nativo de claves foráneas (`FOREIGN KEY`) y `JOINs`. | Datos desnormalizados o embebidos para evitar operaciones complejas. |
| **Casos de uso** | Sistemas transaccionales, financieros, ERPs, CRM de clientes donde la integridad referencial es crítica. | Catálogos masivos no estructurados, analítica de streams, logs en tiempo real. |

---

### 6. ¿Cómo protegerías la información de los clientes?
1. **Cifrado en tránsito y reposo:** Forzar HTTPS con TLS 1.3 para que los datos viajen cifrados entre navegador y servidor.
2. **Hashing de contraseñas:** Uso de algoritmos de derivación de claves con sal (*salt*) como **bcrypt** (costo computacional calibrado), imposibilitando la recuperación en texto plano.
3. **Mínimo privilegio de acceso (RBAC):** Solamente roles autorizados (`admin`) pueden acceder al listado de solicitudes o eliminarlas.
4. **Sanitización y validación estricta de entradas:** Limpieza de datos en frontend y backend para prevenir inyección de código.
5. **Políticas de expiración de sesiones:** Tokens JWT con tiempo de vida limitado (`expiresIn: '8h'`) para mitigar secuestro de sesión.

---

### 7. ¿Cómo implementarías autenticación y autorización?
- **Autenticación (¿Quién eres?):**
  1. El cliente envía `correo` y `password` al endpoint `/api/auth/login`.
  2. El backend busca el usuario y compara el hash con `bcrypt.compareSync()`.
  3. Si es correcto, firma un JSON Web Token (JWT) conteniendo el payload (`id`, `correo`, `rol`) firmado con una clave secreta (`JWT_SECRET`).
- **Autorización (¿Qué permisos tienes?):**
  1. El frontend almacena el token y lo adjunta en el encabezado `Authorization: Bearer <token>`.
  2. El middleware `authMiddleware` valida la firma del token y su vigencia.
  3. El middleware `requireRole('admin')` verifica que `req.user.rol === 'admin'` antes de autorizar la acción (ej. en el endpoint de eliminación `DELETE`).

---

### 8. ¿Qué es JWT y para qué se utiliza?
**JSON Web Token (JWT)** es un estándar abierto (RFC 7519) que define una forma compacta y autónoma de transmitir información de forma segura entre partes como un objeto JSON.
Consta de tres partes codificadas en Base64Url separadas por puntos:
1. **Header:** Algoritmo y tipo de token.
2. **Payload:** Reclamos (*claims*) sobre la identidad y metadatos (ej. usuario, rol, expiración).
3. **Signature:** Firma criptográfica calculada con el secreto del servidor.
**Uso principal:** Autenticación sin estado (*Stateless Session Management*), permitiendo al backend verificar la identidad del usuario en cada petición sin consultar repetitivamente la base de datos o guardar sesiones en memoria.

---

### 9. ¿Cómo evitarías ataques de inyección SQL?
- **Uso obligatorio de Consultas Preparadas / Sentencias Parametrizadas (*Prepared Statements*):**
  En lugar de concatenar cadenas arbitrarias del usuario (`SELECT * FROM contactos WHERE correo = '` + email + `'`), se utilizan marcadores de posición (`?`):
  ```javascript
  db.prepare('SELECT * FROM contactos WHERE correo = ?').get(email);
  ```
- **Validación de tipos de datos y listas blancas:** Asegurar que parámetros como `id` sean enteros válidos y filtros de estado coincidan con enumeraciones permitidas.
- **Principio de menor privilegio en la base de datos:** El usuario de conexión a la BD debe tener únicamente los permisos necesarios (SELECT, INSERT, UPDATE, DELETE) y nunca permisos de administración global (como DROP DATABASE).

---

### 10. ¿Cómo mejorarías el rendimiento de una página web?
1. **Empaquetado moderno y Code Splitting con Vite:** Carga modular dinámica de JavaScript y eliminación de código muerto (*Tree Shaking*).
2. **Optimización de activos estáticos:** Compresión de imágenes a formatos de última generación (WebP/AVIF) y minificación de CSS y JS.
3. **Paginación e indexación en base de datos:** Creación de índices B-tree sobre columnas consultadas frecuentemente (`estado`, `correo`) y limitar consultas con `LIMIT` y `OFFSET`.
4. **Caché HTTP y CDN:** Utilizar cabeceras `Cache-Control` y redes de distribución de contenido (Cloudflare, AWS CloudFront) para servir assets estáticos cerca del usuario.
5. **Cero re-renders innecesarios en React:** Empleo de estados locales contenidos y memoización cuando el árbol de componentes crezca.

---

### 11. ¿Qué importancia tiene Git en el desarrollo de software?
- **Control de Versiones Distribuido:** Permite registrar cada cambio en el código mediante commits atómicos, facilitando auditorías históricas y reversión ante incidentes.
- **Trabajo en equipo y bifurcación (Branching & Merging):** Facilita que múltiples ingenieros colaboren simultáneamente en ramas de características (*feature branches*) sin interferencias.
- **Trazabilidad e Integración Continua (CI/CD):** Habilita la automatización de pruebas unitarias, análisis estático de vulnerabilidades y despliegue continuo ante cada Pull Request aprobado.

---

### 12. ¿Cómo implementarías pruebas unitarias?
- **Herramientas:** Uso de **Vitest** o **Jest** junto a bibliotecas como **Supertest** para el backend y **React Testing Library** para el frontend.
- **Backend:**
  - Mockear la capa de base de datos o usar una base de datos SQLite en memoria (`:memory:`).
  - Probar validaciones del payload en `/api/contacts` (ej. asegurar que retorne error 400 si el correo no tiene formato válido).
  - Probar que `authMiddleware` rechace peticiones sin header `Authorization` con código 401.
- **Frontend:**
  - Probar que el formulario de contacto muestre mensajes de error si se hace clic en "Enviar" con campos vacíos.
  - Verificar que el botón de envío cambie de estado a "cargando" durante la petición asíncrona.

---

### 13. ¿Qué harías si el sistema recibe una cantidad elevada de solicitudes?
1. **Escalabilidad Horizontal del Backend:** Desplegar múltiples réplicas de Node.js mediante contenedores **Docker** orquestados con **Kubernetes (K8s)** o servicios Serverless/Auto-scaling groups tras un **Balanceador de Carga (Load Balancer / Nginx)**.
2. **Colas de Mensajería Asíncronas (Message Brokers):** Encolar las solicitudes de contacto entrantes en **RabbitMQ** o **AWS SQS / Redis BullMQ**, respondiendo de inmediato con 202 Accepted al usuario y procesando inserciones y notificaciones de correo en segundo plano.
3. **Caché en Memoria con Redis:** Cachear catálogos que cambian con poca frecuencia (como la lista de servicios `/api/services`) para evitar golpear la base de datos relacional.
4. **Rate Limiting:** Proteger la API contra abusos y ataques DoS con librerías como `express-rate-limit`.

---

### 14. ¿Cómo organizarías el código para facilitar su mantenimiento?
- **Arquitectura en Capas (Layered Architecture):**
  - **Capa de Presentación:** Componentes visuales desacoplados en el frontend (`components/`, `views/`).
  - **Capa de Controladores / Rutas:** Exposición de endpoints HTTP en Express (`routes/`, `controllers/`).
  - **Capa de Servicios / Negocio:** Lógica pura de aplicación independiente del framework web (`services/`).
  - **Capa de Acceso a Datos (DAL):** Modelos, repositorios y abstracción de consultas SQL (`db/`, `models/`).
- **Principios SOLID y Clean Code:** Nombres de variables y funciones autodescriptivos, responsabilidad única por módulo y centralización de configuración en variables de entorno.

---

### 15. ¿Cómo desplegarías la aplicación en un entorno de producción?
1. **Contenedorización con Docker:** Crear un `Dockerfile` multi-stage para compilar los assets del frontend con Vite y otro para empaquetar el servidor de Node.js en una imagen ligera `node:alpine`.
2. **Frontend:** Servido desde un almacenamiento perimetral CDN de alta velocidad (como Vercel, Netlify o AWS S3 + CloudFront).
3. **Backend & Base de Datos:**
   - Desplegar la API en **Render, Railway o AWS ECS / Elastic Beanstalk**.
   - Conectar el backend a una base de datos relacional administrada (como **AWS RDS PostgreSQL** o **Supabase**), aplicando las migraciones del `database/schema.sql`.
4. **Infraestructura como Código & CI/CD:** Configurar **GitHub Actions** para que ante cada push a la rama `main` se ejecuten los linters, tests automáticos y el despliegue sin tiempo de inactividad (*zero-downtime rolling deployment*).

