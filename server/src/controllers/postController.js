import Post from "../models/postModel.js";
import { handleErrors } from "../utils/helpers.js";

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
      res.status(404).json({
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
    const posts = await Post.find({userId: userId });

    if (!posts) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
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
  const { title, content } = req.body;

  try {
    const updatedPost = await Post.findById(id);

    updatedPost.title = title || updatedPost.title;
    updatedPost.content = content || updatedPost.content;

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
    await Post.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
