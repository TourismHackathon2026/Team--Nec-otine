const User = require("../models/User");
const GuideProfile = require("../models/GuideProfile");
const TouristProfile = require("../models/TouristProfile");

/**
 * Register a new user after Firebase Authentication
 */
const registerUser = async (req, res) => {
    try {
        const { fullName, role, phone } = req.body;

        const firebaseUID = req.user.uid;
        const email = req.user.email;

        // Check if user already exists
        const existingUser = await User.findOne({ firebaseUID });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered."
            });
        }

        // Create User
        const user = await User.create({
            firebaseUID,
            fullName,
            email,
            role,
            phone
        });

        // Create Guide Profile
        if (role === "guide") {
            await GuideProfile.create({
                user: user._id,
                bio: "",
                languages: [],
                experience: 0,
                district: "",
                pricePerDay: 0,
                isAvailable: true
            });
        }

        // Create Tourist Profile
        if (role === "tourist") {
            await TouristProfile.create({
                user: user._id,
                interests: [],
                country: "",
                city: ""
            });
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user
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
 * Get currently logged-in user
 */
const getCurrentUser = async (req, res) => {
    try {

        const user = await User.findOne({
            firebaseUID: req.user.uid
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
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
    registerUser,
    getCurrentUser
};
