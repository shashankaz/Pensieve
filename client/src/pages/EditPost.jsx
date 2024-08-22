import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);
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
          setHeaderImageUrl(post.headerImage);
          setPublicId(post.imgPublicId);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };
      fetchPost();
    }
  }, [user, id, navigate]);

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
        setPublicId(data.publicId);
        setUploading(false);
      } else {
        setErrorMessage("Image upload failed.");
        setUploading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Image upload failed.");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!headerImageUrl) {
      setErrorMessage("Please upload the header image first.");
      return;
    }

    try {
      const updatedPost = {
        title,
        content,
        headerImage: headerImageUrl,
        imgPublicId: publicId,
      };

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
        setErrorMessage("Failed to update blog post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMessage("Failed to update blog post.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 pt-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl my-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Blog Post</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded w-full py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 outline-none"
            placeholder="Enter the title"
            required
          />
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Header Image</label>
          <input
            type="file"
            className="rounded w-full py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
            onChange={(e) => setHeaderImage(e.target.files[0])}
          />
          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              setUploading(true);
              await handleImageUpload();
            }}
            className={`mt-2 py-2 px-6 rounded font-bold ${
              uploading ? "cursor-not-allowed" : ""
            } bg-gray-500 dark:bg-gray-700 text-white hover:bg-gray-600 dark:hover:bg-gray-800`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
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
          <label className="block text-sm font-bold mb-2">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="rounded w-full py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
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

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
