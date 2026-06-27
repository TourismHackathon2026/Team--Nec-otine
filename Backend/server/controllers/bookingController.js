const User = require("../models/User");
const Booking = require("../models/Booking");
const GuideProfile = require("../models/GuideProfile");

/**
 * POST /api/bookings
 * Tourist creates a booking request
 */
const createBooking = async (req, res) => {
  try {
    const tourist = await User.findOne({ firebaseUID: req.user.uid });

    if (!tourist) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (tourist.role !== "tourist") {
      return res.status(403).json({
        success: false,
        message: "Only tourists can create bookings"
      });
    }

    const { guideId, startDate, endDate, groupSize, message } = req.body;

    // Find guide profile to calculate total price
    const guideProfile = await GuideProfile.findById(guideId);

    if (!guideProfile) {
      return res.status(404).json({
        success: false,
        message: "Guide not found"
      });
    }

    // Calculate number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * guideProfile.pricePerDay;

    const booking = await Booking.create({
      guide: guideProfile.user,
      tourist: tourist._id,
      startDate,
      endDate,
      groupSize,
      message,
      totalPrice
    });

    return res.status(201).json({
      success: true,
      message: "Booking request sent successfully",
      booking
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

/**
 * GET /api/bookings/mine
 * Get bookings for the logged in user
 * Works for both tourist and guide
 */
const getMyBookings = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.user.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    let bookings;

    if (user.role === "tourist") {
      bookings = await Booking.find({ tourist: user._id })
        .populate("guide", "fullName email profileImage phone")
        .sort({ createdAt: -1 });
    } else if (user.role === "guide") {
      bookings = await Booking.find({ guide: user._id })
        .populate("tourist", "fullName email profileImage phone")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

/**
 * PUT /api/bookings/:id
 * Guide accepts or rejects a booking
 */
const updateBookingStatus = async (req, res) => {
  try {
    const guide = await User.findOne({ firebaseUID: req.user.uid });

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (guide.role !== "guide") {
      return res.status(403).json({
        success: false,
        message: "Only guides can update booking status"
      });
    }

    const { status } = req.body;

    if (!["confirmed", "rejected", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, guide: guide._id },
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      booking
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  updateBookingStatus
};