const { Support } = require('../models');

/* POST /api/support  – create ticket */
exports.create = async (req, res, next) => {
  try {
    const ticket = await Support.create(req.body);
    res.status(201).json(ticket);
  } catch (err) { next(err); }
};