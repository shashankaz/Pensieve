import User from "../models/userModel.js";
import { handleErrors } from "../utils/helpers.js";

export const getUserBio = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User bio",
      user,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const createUserBio = async (req, res) => {
  const { userId } = req.params;

  try {
    const existingUser = await User.findOne({ userId });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({ userId, bio: "" });

    res.status(201).json({
      success: true,
      message: "Bio created",
      user,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const updateUserBio = async (req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.bio = bio || user.bio;

    await user.save();

    res.json({
      success: true,
      message: "Bio updated",
      user,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const updateBookmark = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    const bookmarkIndex = user.bookmarks.indexOf(postId);

    if (bookmarkIndex > -1) {
      user.bookmarks.splice(bookmarkIndex, 1);
      await user.save();

      return res.json({
        success: true,
        message: "Bookmark removed",
        bookmarks: user.bookmarks,
      });
    } else {
      user.bookmarks.push(postId);
      await user.save();

      return res.json({
        success: true,
        message: "Bookmark created",
        bookmarks: user.bookmarks,
      });
    }
  } catch (error) {
    handleErrors(res, error);
  }
};
