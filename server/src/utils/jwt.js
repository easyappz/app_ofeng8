const jwt = require('jsonwebtoken');

// No .env files; constants in code
const JWT_SECRET = 'easyappz_jwt_secret_change_me';

function signToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signToken, verifyToken };
