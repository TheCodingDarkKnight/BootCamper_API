const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Bootcamp = require("../models/Bootcamp");

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.find();
  res.status(200).json({ sucess: true, count: data.length, data });
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
  try {
    const data = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!data) {
      return next(
        new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400)
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});
