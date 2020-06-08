const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");

const Bootcamp = require("../models/Bootcamp");

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const { select, sort, page: pageCount, limit, ...reqQuery } = req.query;

  // Create query string
  let queryString = JSON.stringify(reqQuery);

  // Create operators ($gt, $lt, $in, etc)
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding bootcamps
  let query = Bootcamp.find(JSON.parse(queryString)).populate("courses");

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
  const total = await Bootcamp.countDocuments();

  query.skip(startIndex).limit(limitBy);

  // Executing query
  const data = await query;

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

  res.status(200).json({ sucess: true, count: data.length, pagination, data });
});
//@desc     Create bootcamp
//@route    GET /api/v1/bootcamps
//@access   Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data });
});

//@desc     Get bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.findById(req.params.id);
  if (!data) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400)
    );
  }
  res.status(200).json({ success: true, data });
});

//@desc     Update bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400)
    );
  }
  res.status(200).json({ success: true, data });
});

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.findById(req.params.id);
  if (!data) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400)
    );
  }
  data.remove();
  res.status(200).json({ success: true, data: {} });
});

//@desc     Get bootcamp within a radius
//@route    GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
//@access   Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance, unit } = req.params;

  //Get lat/long from geocoder
  const loc = await geocoder.geocode(zipcode);
  const { latitude: lat, longitude: lng } = loc[0];

  // Calc radius using radians
  // Divide distance by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km

  const radius = distance / (unit === "km" ? 6378 : 3963);

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
