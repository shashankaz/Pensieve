import React, { useEffect, useState } from "react";

const Suggestions = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const featuredPosts = [
    { _id: "1", title: "The Rise of React", slug: "the-rise-of-react" },
    {
      _id: "2",
      title: "Understanding JavaScript Closures",
      slug: "understanding-javascript-closures",
    },
    {
      _id: "3",
      title: "10 Tips for Writing Clean Code",
      slug: "10-tips-for-clean-code",
    },
  ];

  const mostViewedPosts = [
    { _id: "4", title: "Mastering CSS Grid", slug: "mastering-css-grid" },
    {
      _id: "5",
      title: "A Guide to Modern Web Development",
      slug: "guide-to-modern-web-development",
    },
    {
      _id: "6",
      title: "Getting Started with TypeScript",
      slug: "getting-started-with-typescript",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col min-w-[30%] h-screen mt-20 fixed border-l border-black p-4">
      <h2 className="text-lg font-bold mb-4">Suggestions</h2>
      {loading ? (
        <div className="text-gray-600">Loading suggestions...</div>
      ) : (
        <div>
          <div>
            <h3 className="text-md font-semibold mb-2">Featured Posts</h3>
            <ul className="space-y-2">
              {featuredPosts.map((post) => (
                <a key={post._id} href={`/post/${post.slug}`}>
                  <li className="bg-gray-200 py-1 px-3 rounded-3xl hover:bg-gray-300 mb-2">
                    {post.title}
                  </li>
                </a>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-md font-semibold mb-2">Most Viewed Posts</h3>
            <ul className="space-y-2">
              {mostViewedPosts.map((post) => (
                <a key={post._id} href={`/post/${post.slug}`}>
                  <li className="bg-gray-200 py-1 px-3 rounded-3xl hover:bg-gray-300 mb-2">
                    {post.title}
                  </li>
                </a>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
