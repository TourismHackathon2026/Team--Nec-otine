const User = require("../models/User");
const GuideProfile = require("../models/GuideProfile");

/**
 * GET /api/guides
 * Get all available guides with their user info
 */
const getAllGuides = async (req, res) => {
  try {
    const guides = await GuideProfile.find({ available: true })
      .populate("user", "fullName email profileImage phone");

    return res.status(200).json({
      success: true,
      guides
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
 * GET /api/guides/:id
 * Get a single guide by their GuideProfile ID
 */
const getGuideById = async (req, res) => {
  try {
    const guide = await GuideProfile.findById(req.params.id)
      .populate("user", "fullName email profileImage phone");

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: "Guide not found"
      });
    }

    return res.status(200).json({
      success: true,
      guide
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
 * PUT /api/guides/profile
 * Guide updates their own profile
 */
const updateGuideProfile = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.user.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role !== "guide") {
      return res.status(403).json({
        success: false,
        message: "Only guides can update a guide profile"
      });
    }

    const { bio, languages, experience, district, pricePerDay, available } = req.body;

    const updatedProfile = await GuideProfile.findOneAndUpdate(
      { user: user._id },
      { bio, languages, experience, district, pricePerDay, available },
      { new: true }
    ).populate("user", "fullName email profileImage phone");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      guide: updatedProfile
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
  getAllGuides,
  getGuideById,
  updateGuideProfile
};