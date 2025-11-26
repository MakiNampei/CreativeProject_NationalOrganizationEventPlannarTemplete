const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'hq_admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { requireAdmin };