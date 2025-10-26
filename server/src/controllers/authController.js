const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, TOKEN_EXPIRES } = require('@src/config/constants');
const User = require('@src/models/User');

function createToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: { message: 'Missing name, email or password' } });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: { message: 'Email already registered' } });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hash });
    const token = createToken(user);
    return res.json({ user: user.toJSON(), token });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid email or password' } });
    }
    const match = await bcrypt.compare(password || '', user.password);
    if (!match) {
      return res.status(401).json({ error: { message: 'Invalid email or password' } });
    }
    const token = createToken(user);
    return res.json({ user: user.toJSON(), token });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function me(req, res) {
  try {
    const user = await User.findById(req.user._id).lean();
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

module.exports = { register, login, me };
