const express = require('express');
const router = express.Router();

const authMiddleware = require('../auth/auth.middlewares');

const isAuth = authMiddleware.isAuth;

// get data list Post
router.get('/', async (req, res) => {
	res.send('APP post IS RUNNING');
});

// get Post detail
router.get('/:id', (req, res) => {
	// res.send(req.user);
});

router.post('/create', isAuth, async (req, res) => {
	// res.send(req.user);
});

module.exports = router;
