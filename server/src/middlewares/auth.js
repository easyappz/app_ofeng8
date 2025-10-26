const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('@src/config/constants');
const User = require('@src/models/User');

async function requireAuth(req, res, next) {
  try {
    const header = req.headers['authorization'] || req.headers['Authorization'];
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: { message: 'Authorization header missing or invalid', details: { code: 'NO_AUTH_HEADER' } } });
    }
    const token = header.replace('Bearer ', '').trim();
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: { message: 'Invalid token', details: { name: err.name, message: err.message } } });
    }

    const user = await User.findById(payload.id).lean();
    if (!user) {
      return res.status(401).json({ error: { message: 'User not found for token', details: { code: 'USER_NOT_FOUND' } } });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

function isAdmin(req, res, next) {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: { message: 'Admin privileges required', details: { code: 'NOT_ADMIN' } } });
    }
    return next();
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

module.exports = { requireAuth, isAdmin };
