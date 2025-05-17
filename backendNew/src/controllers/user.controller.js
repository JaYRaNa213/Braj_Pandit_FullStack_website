const User = require("../models/user.model");

const updateUserProfile = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and ID is available

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, profileImage },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({
      success: false,
      message: "Server Error. Unable to update profile.",
    });
  }
};

module.exports = {
  updateUserProfile,
};
