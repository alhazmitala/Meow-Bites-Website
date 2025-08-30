const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const { User } = require('../models');

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '1d' }
  );

// ---------- POST /api/users/signup ----------
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!password || password.length < 6)
      return res.status(400).json({ message: 'Password ≥ 6 chars' });

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash: hash });

    res.status(201).json({
      token : signToken(user),
      user  : { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError')
      return res.status(400).json({ message: 'Email already registered' });
    next(err);
  }
};

// ---------- POST /api/users/login ----------
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      token : signToken(user),
      user  : { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) { next(err); }
};

// ---------- GET /api/users/me ----------
exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'name', 'email', 'createdAt'],
  });
  res.json(user);
};
