import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [headerImage, setHeaderImage] = useState(null);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      const fetchPost = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`
          );
          const data = await response.json();
          const post = data.post;
          setTitle(post.title);
          setContent(post.content);
          // setHeaderImage(post.headerImage);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      fetchPost();
    }
  }, [user, id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title,
      content,
      headerImage: "unavailable",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (response.ok) {
        alert("Blog post updated successfully!");
        navigate(`/blog/${id}`);
      } else {
        alert("Failed to update blog post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 pt-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl my-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Edit Blog Post
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter the title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Header Image
          </label>
          <input
            type="file"
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {headerImage && (
          <div className="mb-4">
            <img
              src={headerImage}
              alt="Header Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content (use HTML tags and Tailwind for styling)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            rows="10"
            placeholder="Write your content here..."
            required
          ></textarea>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
