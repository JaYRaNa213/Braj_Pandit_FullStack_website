import User from '../models/user.model.js'; // Adjust the path if needed

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    const userId = req.user._id || req.user.id; // Make sure req.user is set by middleware

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, profileImage },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error. Unable to update profile.',
    });
  }
};
