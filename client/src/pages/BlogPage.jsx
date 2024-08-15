import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";

const BlogPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [morePosts, setMorePosts] = useState([]);

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

  if (!post) {
    return <div>Loading...</div>;
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
        </article>

        <aside className="py-6 border-t">
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
        </aside>
      </main>
    </div>
  );
};

export default BlogPage;
