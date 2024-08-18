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

    if (!updatedPost) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }

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
