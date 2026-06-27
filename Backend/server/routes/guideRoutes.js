const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getAllGuides,
  getGuideById,
  updateGuideProfile
} = require("../controllers/guideController");

router.get("/", getAllGuides);
router.get("/:id", getGuideById);
router.put("/profile", verifyToken, updateGuideProfile);

module.exports = router;