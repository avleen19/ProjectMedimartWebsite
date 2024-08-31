const express = require('express');
const { signUp, login } = require('../Controllers/authController');
const router = express.Router();

// Sign-Up route (previously Register route)
router.post('/sign-up', signUp);

// Login route
router.post('/login', login);

module.exports = router;
