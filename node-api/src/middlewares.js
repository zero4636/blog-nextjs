exports.validatePageAndLimit = (req, res, next) => {
  const pageNumber = parseInt(req.params.pageNumber);
  const limit = parseInt(req.params.limit);

  if (Number.isNaN(pageNumber) || Number.isNaN(limit) || pageNumber <= 0 || limit <= 0) {
    return res.status(400).json({ message: 'Invalid pageNumber or limit' });
  }

  req.pageNumber = pageNumber;
  req.limit = limit;
  next();
}
