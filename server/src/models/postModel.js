import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String,
        required: true,
      },
    },
    userId: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    headerImage: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
