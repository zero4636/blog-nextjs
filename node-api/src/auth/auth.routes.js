const express = require('express');
const router = express.Router();

const authMiddleware = require('../auth/auth.middlewares');
const isAuth = authMiddleware.isAuth;
const authController = require('./auth.controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/validateToken', isAuth, authController.validateToken)

module.exports = router;
