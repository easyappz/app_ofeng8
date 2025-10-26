const bcrypt = require('bcryptjs');

const User = require('@src/models/User');
const { signToken } = require('@src/utils/jwt');

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: { message: 'Email and password are required', details: { fields: ['email', 'password'] } } });
    }

    const emailNorm = String(email).toLowerCase().trim();

    const exists = await User.findOne({ email: emailNorm });
    if (exists) {
      return res.status(409).json({ error: { message: 'User with this email already exists', details: { email: emailNorm } } });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(String(password), salt);

    const user = await User.create({
      name: name ? String(name).trim() : '',
      email: emailNorm,
      passwordHash,
      role: 'user',
      phone: phone ? String(phone).trim() : '',
      address: address && typeof address === 'object' ? address : {}
    });

    const token = signToken({ id: user._id.toString(), role: user.role, email: user.email }, '7d');

    return res.status(201).json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: { message: 'Email and password are required', details: { fields: ['email', 'password'] } } });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid email or password', details: { reason: 'user_not_found' } } });
    }

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: { message: 'Invalid email or password', details: { reason: 'password_mismatch' } } });
    }

    const token = signToken({ id: user._id.toString(), role: user.role, email: user.email }, '7d');

    return res.status(200).json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
};
