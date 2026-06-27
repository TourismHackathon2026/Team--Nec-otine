const mongoose = require("mongoose");

const touristProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    country: {
      type: String,
      trim: true
    },

    city: {
      type: String,
      trim: true
    },

    preferredLanguage: {
      type: String,
      default: "English"
    },

    budget: {
      type: Number,
      default: 0
    },

    interests: [
      {
        type: String
      }
    ],

    emergencyContact: {
      name: String,
      phone: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TouristProfile", touristProfileSchema);
