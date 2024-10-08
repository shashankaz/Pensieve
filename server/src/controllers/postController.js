import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { handleErrors } from "../utils/helpers.js";
import cloudinary from "../config/cloudinaryConfig.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({
      status: "success",
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getPostByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ userId });

    if (!posts.length) {
      return res.status(404).json({
        status: "fail",
        message: "No posts found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getBookmarkByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const bookmarkedPosts = user.bookmarks;

    res.status(200).json({ status: "success", bookmarks: bookmarkedPosts });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = await Post.create(post);

    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, headerImage, imgPublicId } = req.body;

  try {
    const updatedPost = await Post.findById(id);

    if (!updatedPost) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }

    if (headerImage && updatedPost.imgPublicId) {
      await cloudinary.uploader.destroy(updatedPost.imgPublicId);
    }

    updatedPost.title = title || updatedPost.title;
    updatedPost.content = content || updatedPost.content;
    updatedPost.headerImage = headerImage || updatedPost.headerImage;
    updatedPost.imgPublicId = imgPublicId || updatedPost.imgPublicId;

    await updatedPost.save();

    res.status(200).json({
      status: "success",
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }

    if (post.imgPublicId) {
      await cloudinary.uploader.destroy(post.imgPublicId);
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a file" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog-headers" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    res
      .status(200)
      .json({ imageUrl: result.secure_url, publicId: result.public_id });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const updateBookmark = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const postExists = await Post.findById(id);

    if (!postExists) {
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found" });
    }

    const isBookmarked = user.bookmarks.includes(id);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((postId) => postId !== id);
    } else {
      user.bookmarks.push(id);
    }

    await user.save();

    res.status(200).json({
      message: isBookmarked
        ? "Bookmark removed successfully"
        : "Bookmark added successfully",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { userId, username, text } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }

    const newComment = { userId, username, text };
    post.comments.push(newComment);

    await post.save();

    res.status(201).json({
      status: "success",
      message: "Comment added successfully",
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const updateComment = async (req, res) => {
  const { id, commentId } = req.params;
  const { text } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        status: "fail",
        message: "Comment not found",
      });
    }

    comment.text = text || comment.text;
    await post.save();

    res.status(200).json({
      status: "success",
      message: "Comment updated successfully",
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        status: "fail",
        message: "Comment not found",
      });
    }

    comment.remove();
    await post.save();

    res.status(200).json({
      status: "success",
      message: "Comment deleted successfully",
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
