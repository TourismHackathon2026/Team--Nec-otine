const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createBooking,
  getMyBookings,
  updateBookingStatus
} = require("../controllers/bookingController");

router.post("/", verifyToken, createBooking);
router.get("/mine", verifyToken, getMyBookings);
router.put("/:id", verifyToken, updateBookingStatus);

module.exports = router;