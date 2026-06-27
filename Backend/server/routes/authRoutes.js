const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { registerUser, getCurrentUser } = require("../controllers/authController");

router.post("/register", verifyToken, registerUser);
router.get("/me", verifyToken, getCurrentUser);

module.exports = router;
