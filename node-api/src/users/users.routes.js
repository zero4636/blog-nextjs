const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/auth.middlewares');

const userController = require('./users.controllers');
const isAuth = authMiddleware.isAuth;

router.get('/profile', isAuth, async (req, res) => {
	res.send(req.user);
});

router.get('/', userController.getAll)

module.exports = router;
