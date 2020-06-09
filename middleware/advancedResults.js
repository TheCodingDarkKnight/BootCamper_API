const advancedResults = (model, populate) => async (req, res, next) => {
  const { select, sort, page: pageCount, limit, ...reqQuery } = req.query;

  // Create query string
  let queryString = JSON.stringify(reqQuery);

  // Create operators ($gt, $lt, $in, etc)
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resourse
  let query = model.find(JSON.parse(queryString));

  // Select Fields
  if (select) {
    const fields = select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort by Fields
  if (sort) {
    const sortBy = sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(pageCount, 10) || 1;
  const limitBy = parseInt(limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query.skip(startIndex).limit(limitBy);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
