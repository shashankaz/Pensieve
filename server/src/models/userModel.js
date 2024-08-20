import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "",
  },
  bookmarks: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
