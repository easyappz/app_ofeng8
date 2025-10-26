const { verifyToken } = require('@src/utils/jwt');

module.exports = function auth(req, res, next) {
  try {
    const header = req.headers['authorization'] || req.headers['Authorization'];
    if (!header || typeof header !== 'string') {
      return res.status(401).json({ error: { message: 'Authorization header is missing', details: { expected: 'Authorization: Bearer <token>' } } });
    }

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: { message: 'Invalid Authorization header format', details: { received: header } } });
    }

    const token = parts[1];
    const payload = verifyToken(token);

    req.user = { id: payload.id, role: payload.role, email: payload.email };
    return next();
  } catch (error) {
    return res.status(401).json({ error: { message: 'Invalid or expired token', details: { name: error.name, message: error.message } } });
  }
};
