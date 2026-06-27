const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    groupSize: {
      type: Number,
      required: true,
      min: 1,
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "cancelled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);