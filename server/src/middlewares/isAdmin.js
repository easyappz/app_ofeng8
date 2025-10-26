module.exports = function isAdmin(req, res, next) {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: { message: 'Admin access required', details: { role: req.user ? req.user.role : 'none' } } });
    }
    return next();
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
};
