const express = require('express');
const router = express.Router();
const cateController = require('./category.controllers')

const authMiddleware = require('../auth/auth.middlewares');
const middleware = require('../middlewares');
const isAuth = authMiddleware.isAuth;

function validateCategoryFormat(req, res, next) {
  const { name, description } = req.body;
  const validProperties = ['name', 'description'];
  const invalidProperties = Object.keys(req.body).filter(
    property => !validProperties.includes(property)
  );
  if (invalidProperties.length > 0) {
    return res.status(400).json({ message: 'Invalid request data format' });
  }
  next();
}

router.get('/cateAll', cateController.getCategories);
router.get('/', cateController.getCategoriesLimit);
router.get('/:pageNumber/:limit', middleware.validatePageAndLimit, cateController.getCategoriesLimit);
router.get('/:id', cateController.getCategoriesId);
router.post('/create', validateCategoryFormat, cateController.createCate);
router.post('/delete', cateController.deleteCateById);

module.exports = router;
