import express from "express";
import {
  getPosts,
  getPostById,
  getPostByUserId,
  createPost,
  updatePost,
  deletePost,
  uploadImage,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/postController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/user/:userId", getPostByUserId);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/comments", addComment);
router.put("/:id/comments/:commentId", updateComment);
router.delete("/:id/comments/:commentId", deleteComment);
router.post("/upload", upload.single("headerImage"), uploadImage);

export default router;
