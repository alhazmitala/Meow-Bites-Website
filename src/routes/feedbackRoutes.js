// src/routes/feedbackRoutes.js
const express  = require('express');
const { Feedback } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const fb = await Feedback.create(req.body);
    res.status(201).json(fb);
  } catch (err) { next(err); }
});

module.exports = router;

