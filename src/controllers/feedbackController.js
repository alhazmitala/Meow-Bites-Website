const { Feedback } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const fb = await Feedback.create(req.body);
    res.status(201).json(fb);
  } catch (err) { next(err); }
};
