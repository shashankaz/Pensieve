import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const BlogPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [morePosts, setMorePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`
        );
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchMorePosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts`
        );
        const data = await response.json();
        setMorePosts(data.posts.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMorePosts();
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`, {
          method: "DELETE",
        });
        navigate("/");
      } catch (error) {
        console.error("Error deleting the post:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-xl">No post found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center py-10 pt-32 px-4">
      <main className="w-full max-w-3xl mx-auto">
        <div>
          <img
            src="https://picsum.photos/1200/600"
            alt="Blog Header"
            className="w-full h-auto object-cover"
          />
        </div>

        <article className="py-6">
          <h2 className="text-4xl font-bold text-gray-800">{post.title}</h2>
          <div className="flex items-center mt-4">
            <img
              src="https://picsum.photos/100"
              alt="Author"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-600">
                By <span className="font-bold">{post.author.name}</span>
              </p>
              <p className="text-gray-500 text-sm">{post.author.bio}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-gray-600">
            <p>{formatDate(post.createdAt)}</p>
            <span className="mx-2">•</span>
            <p>{post.readTime}</p>
          </div>
          <div
            className="mt-6 text-gray-700 space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          <div className="mt-8 flex items-center justify-between border-t pt-4">
            <button className="flex items-center gap-1">
              <FcLike />
              {post.likes} Likes
            </button>
            <p className="text-gray-600">{post.commentsCount} Comments</p>
          </div>

          <div>
            {user && user.uid === post.userId && (
              <div className="flex items-center justify-between mt-8 border-t pt-4">
                <button
                  onClick={handleEdit}
                  className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-white"
                >
                  Edit Post
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded text-white"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </article>

        <div className="py-6 border-t">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Other Posts</h3>
          <ul className="space-y-4">
            {morePosts.map((relatedPost, index) => (
              <li key={index}>
                <Link
                  to={`/blog/${relatedPost._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {relatedPost.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
