// Define a middleware function for validating pageNumber and limit.
exports.validatePageAndLimit = (req, res, next) => {
  const pageNumber = parseInt(req.params.pageNumber);
  const limit = parseInt(req.params.limit);

  // Check if pageNumber and limit are valid positive integers.
  if (Number.isNaN(pageNumber) || Number.isNaN(limit) || pageNumber <= 0 || limit <= 0) {
    return res.status(400).json({ message: 'Invalid pageNumber or limit' });
  }

  // If validation passes, attach the parsed values to the request object.
  req.pageNumber = pageNumber;
  req.limit = limit;
  next();
}
