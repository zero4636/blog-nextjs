const express = require('express');
const router = express.Router();

const cateController = require('./category.controllers')

const authMiddleware = require('../auth/auth.middlewares');

const middleware = require('../middlewares');

const isAuth = authMiddleware.isAuth;


// Middleware function to validate the format of the category model
function validateCategoryFormat(req, res, next) {
  const { name, description } = req.body;

  // Check if the request body contains only 'name' and 'des' properties
  const validProperties = ['name', 'description'];

  // Check if the request body contains any properties other than 'name' and 'des'
  const invalidProperties = Object.keys(req.body).filter(
    property => !validProperties.includes(property)
  );

  if (invalidProperties.length > 0) {
    return res.status(400).json({ message: 'Invalid request data format' });
  }

  // If the format is valid, proceed to the next middleware or route handler
  next();
}

// get All Cate
router.get('/cateAll', cateController.getCategories);

// get Cate Limit
router.get('/', cateController.getCategoriesLimit);
router.get('/:pageNumber/:limit', middleware.validatePageAndLimit, cateController.getCategoriesLimit);

// get cate detail
router.get('/:id', cateController.getCategoriesId);

// create data
router.post('/create', validateCategoryFormat, cateController.createCate);

// create data
router.post('/delete', cateController.deleteCateById);

module.exports = router;
