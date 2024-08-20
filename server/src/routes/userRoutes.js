import express from "express";
import {
  getUserBio,
  createUserBio,
  updateBookmark,
  updateUserBio,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId", getUserBio);
router.post("/:userId", createUserBio);
router.post("/:userId/bookmark/:postId", updateBookmark);
router.put("/:userId", updateUserBio);

export default router;
