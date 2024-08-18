import mongoose from "mongoose";

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
    comments: [
      {
        username: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
