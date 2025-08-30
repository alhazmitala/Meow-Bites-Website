const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;          // Bearer <token>
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'Auth required' });

  try {
    const decoded   = jwt.verify(
      header.split(' ')[1],
      process.env.JWT_SECRET
    );
    req.user = decoded;                              // { id, email }
    next();
  } catch (_) {
    res.status(401).json({ message: 'Token invalid' });
  }
};
