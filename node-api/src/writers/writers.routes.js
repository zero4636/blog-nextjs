const express = require('express');

const router = express.Router();
const writerController = require('./writers.controllers')
const authMiddleware = require('../auth/auth.middlewares');

const middleware = require('../middlewares');
const isAuth = authMiddleware.isAuth;

router.get('/all', writerController.getAll);
router.get('/', writerController.getWritersLimit);
router.get('/:pageNumber/:limit', middleware.validatePageAndLimit, writerController.getWritersLimit);

module.exports = router;