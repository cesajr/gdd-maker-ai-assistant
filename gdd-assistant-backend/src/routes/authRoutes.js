// src/routes/authRoutes.js

const express = require('express');
const { registerUser } = require('../controllers/authController');

const router = express.Router();

// A rota de registro que já tínhamos feito
router.post('/register', registerUser);

module.exports = router;
