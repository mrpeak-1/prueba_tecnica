const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'arnold_secret_jwt_key_2026_migue_cordova';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Acceso no autorizado: Token no proporcionado.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ success: false, message: 'Formato de token inválido. Formato esperado: Bearer <token>' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Token inválido o expirado.' });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.rol !== role) {
      return res.status(403).json({ success: false, message: `Permisos insuficientes: Requiere rol ${role}.` });
    }
    next();
  };
}

module.exports = {
  authMiddleware,
  requireRole,
  JWT_SECRET
};

