const express = require('express');
const { signUp, login } = require('../Controllers/authController');
const router = express.Router();

router.post('/sign-up', signUp);

router.post('/login', login);

module.exports = router;
