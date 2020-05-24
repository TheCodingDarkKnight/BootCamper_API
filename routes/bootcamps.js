const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
});

router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show ${req.params.id} bootcamp` });
});

router.post("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Create bootcamp" });
});

router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update ${req.params.id} bootcamp` });
});

router.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete ${req.params.id} bootcamp` });
});

module.exports = router;
