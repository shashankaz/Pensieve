import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { formatDistanceToNow } from "date-fns";

const BlogPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [morePosts, setMorePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [newComment, setNewComment] = useState("");
  const [bookmark, setBookmark] = useState(false);
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
        const shuffledPosts = data.posts.sort(() => Math.random() - 0.5);
        setMorePosts(shuffledPosts.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMorePosts();
  }, []);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (user) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/posts/bookmark/${user.uid}`
          );
          if (response.ok) {
            const data = await response.json();
            setBookmark(data.bookmarks.includes(id));
          } else {
            console.error("Error fetching bookmark status");
          }
        } catch (error) {
          console.error("Error checking bookmark status:", error);
        }
      }
    };

    checkBookmarkStatus();
  }, [user, id]);

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

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.uid,
            username: user.displayName || "Anonymous",
            text: newComment,
          }),
        }
      );

      const data = await response.json();
      setPost(data.post);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleBookmark = async () => {
    if (!user) return;

    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/${user.uid}`,
        {
          method: "POST",
        }
      );
      setBookmark((prev) => !prev);
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400 text-xl">
          Loading...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400 text-xl">
          No post found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center py-10 pt-32 px-4 bg-white dark:bg-gray-900">
      <main className="w-full max-w-3xl mx-auto">
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[25.5rem] overflow-hidden">
          <img
            src={post.headerImage}
            alt="Blog Header"
            className="w-full h-full object-cover"
          />
        </div>

        <article className="py-6">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            {post.title}
          </h2>
          <div className="flex items-center mt-4">
            <img
              src={post.author.profileImage}
              alt="Author"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                By <span className="font-bold">{post.author.name}</span>
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {post.author.bio}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
            <p>{formatDate(post.createdAt)}</p>
            <span className="mx-2">•</span>
            <p>{post.readTime}</p>
            {user && <span className="mx-2">•</span>}
            <p
              onClick={handleBookmark}
              className="cursor-pointer"
              title="Bookmark this post"
            >
              {user ? bookmark ? <FaBookmark /> : <FaRegBookmark /> : null}
            </p>
          </div>
          <div
            className="mt-6 text-gray-700 dark:text-gray-300 space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          <div className="mt-6">
            {user && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white border-t pt-4">
                  Leave your comment
                </h3>
                <div className="mt-4">
                  <textarea
                    className="w-full border p-2 dark:bg-gray-800 dark:text-gray-200"
                    rows="4"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <button
                    onClick={handleAddComment}
                    className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-white mt-2"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            )}

            {post.comments.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white pt-4">
                  Comments ({post.comments.length})
                </h3>
                <ul className="space-y-4 mt-4">
                  {post.comments.map((comment) => (
                    <li key={comment._id} className="border-b pb-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-bold">{comment.username}</span>{" "}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                          {comment.text}
                        </p>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            {user && user.uid === post.userId && (
              <div className="flex items-center justify-between mt-6">
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

        <div className="py-6 border-t dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Other Posts
          </h3>
          <ul className="space-y-4">
            {morePosts.map((relatedPost, index) => (
              <li key={index}>
                <Link
                  to={`/blog/${relatedPost._id}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
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
