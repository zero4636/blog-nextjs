const express = require('express');

const router = express.Router();
const authMiddleware = require('../auth/auth.middlewares');
const isAuth = authMiddleware.isAuth;

router.get('/', async (req, res) => {
	res.send('APP post IS RUNNING');
});

router.get('/:id', (req, res) => {
	// res.send(req.user);
});

router.post('/create', isAuth, async (req, res) => {
	// res.send(req.user);
});

module.exports = router;
