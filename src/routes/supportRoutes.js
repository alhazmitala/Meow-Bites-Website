// src/routes/supportRoutes.js
const express  = require('express');
const { Support } = require('../models');

const router = express.Router();

/* POST /api/support  – open a ticket */
router.post('/', async (req, res, next) => {
  try {
    // req.body should include: name, email, subject, message
    const ticket = await Support.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
