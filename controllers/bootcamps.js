const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const data = await Bootcamp.find();

    res.status(200).json({ sucess: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};
//@desc     Create bootcamp
//@route    GET /api/v1/bootcamps
//@access   Public
exports.createBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

//@desc     Get bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamp.findById(req.params.id);
    if (!data) {
      return next(
        new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400)
      );
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

//@desc     Update bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Public
exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Public
exports.deleteBootcamp = async (req, res, next) => {
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
};
