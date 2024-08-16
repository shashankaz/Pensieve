import express from "express";
import {
  getUserBio,
  createUserBio,
  updateUserBio,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId", getUserBio);
router.post("/:userId", createUserBio);
router.put("/:userId", updateUserBio);

export default router;
