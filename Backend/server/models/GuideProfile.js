const mongoose = require("mongoose");

const guideProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    languages: [
      {
        type: String,
        trim: true
      }
    ],

    experience: {
      type: Number,
      default: 0
    },

    district: {
      type: String,
      trim: true
    },

    bio: {
      type: String,
      maxlength: 1000,
      default: ""
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0
    },

    available: {
      type: Boolean,
      default: true
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    totalReviews: {
      type: Number,
      default: 0
    },

    completedTours: {
      type: Number,
      default: 0
    },

    profileCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("GuideProfile", guideProfileSchema);
