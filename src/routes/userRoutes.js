const express = require('express');
const ctrl    = require('../controllers/userController');
const protect = require('../middleware/auth');

const router = express.Router();

router.post('/signup', ctrl.signup);
router.post('/login' , ctrl.login);
router.get ('/me'    , protect, ctrl.me);

module.exports = router;
