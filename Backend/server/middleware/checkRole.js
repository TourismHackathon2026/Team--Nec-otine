const User = require("../models/User");

const checkRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            // req.user comes from verifyToken middleware
            const firebaseUID = req.user.uid;

            const user = await User.findOne({ firebaseUID });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }

            // Store MongoDB user for later use
            req.dbUser = user;

            next();

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Server Error"
            });
        }
    };
};

module.exports = checkRole;
