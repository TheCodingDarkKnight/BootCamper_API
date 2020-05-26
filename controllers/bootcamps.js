const Bootcamp = require("../models/Bootcamp");

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const data = await Bootcamp.find();

    res.status(200).json({ sucess: true, count: data.length, data });
  } catch (err) {
    res.status(400).json({ success: false });
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
    res.status(400).json({ success: false });
  }
};

//@desc     Get bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamp.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Update bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.updateBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Delete bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
