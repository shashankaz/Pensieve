import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [readTime, setReadTime] = useState("10 min read");
  const [likes, setLikes] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [bio, setBio] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const getAIResponse = async (prompt) => {
    try {
      const newPrompt = `Write an article on ${prompt}`;
      const result = await model.generateContent(newPrompt);
      const response = await result.response;
      const text = response.text();
      const htmlText = marked(text);
      return htmlText;
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  const generateContent = async () => {
    if (!title) {
      setErrorMessage("Please enter a title first to generate content.");
      return;
    }
    setErrorMessage("");
    const aiResponse = await getAIResponse(title);
    setContent(aiResponse);
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      const fetchUserBio = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`
          );
          const data = await response.json();
          if (data.success && data.user) {
            setBio(data.user.bio);
          }
        } catch (error) {
          console.error("Error fetching user bio:", error);
        }
      };

      fetchUserBio();
    }
  }, [user, navigate]);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("headerImage", headerImage);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setHeaderImageUrl(data.imageUrl);
        setUploading(false);
      } else {
        alert("Image upload failed");
        setUploading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!headerImageUrl) {
        alert("Please upload the header image first.");
        return;
      }

      const newPost = {
        title,
        author: {
          name: user.displayName,
          bio: bio || "I'm a blogger on the web.",
          profileImage: user.photoURL || "https://picsum.photos/100",
        },
        userId: user.uid,
        content,
        headerImage: headerImageUrl || "https://picsum.photos/1200/600",
        readTime,
        likes,
        commentsCount,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      if (response.ok) {
        alert("Blog post created successfully!");
        navigate("/");
      } else {
        alert("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 pt-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl my-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Create a Blog Post
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded w-full py-2 text-gray-700 outline-none"
            placeholder="Enter the title"
            required
          />
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Header Image
          </label>
          <input
            type="file"
            className="rounded w-full py-2 text-gray-700"
            onChange={(e) => setHeaderImage(e.target.files[0])}
            required
          />
          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              setUploading(true);
              await handleImageUpload();
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded mt-2"
          >
            Upload
          </button>
          {uploading && (
            <p className="text-sm text-gray-700 mt-2">Uploading image...</p>
          )}
        </div>

        {headerImageUrl && (
          <div className="mb-4">
            <img
              src={headerImageUrl}
              alt="Header Preview"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="rounded w-full py-2 text-gray-700"
            placeholder="Write your content here..."
            theme="snow"
            style={{ height: "400px", overflowY: "auto" }}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                ["link"],
                ["clean"],
              ],
            }}
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={generateContent}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
          >
            Generate Content with AI
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
