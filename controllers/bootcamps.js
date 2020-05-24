//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
};
//@desc     Create bootcamp
//@route    GET /api/v1/bootcamps
//@access   Public
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create bootcamp" });
};

//@desc     Get bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show ${req.params.id} bootcamp` });
};

//@desc     Update bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update ${req.params.id} bootcamp` });
};

//@desc     Delete bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete ${req.params.id} bootcamp` });
};
