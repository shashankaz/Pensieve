import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Card from "./Card";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts`
        );
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reverse();

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 pt-20 my-10 w-full lg:pr-[30%]">
      <div className="flex items-center mb-6">
        <div className="bg-gray-100 text-black py-3 pr-2 pl-4 rounded-l-3xl">
          <CiSearch />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-100 py-2 px-2 outline-none rounded-r-3xl w-full"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <h1 className="text-xl text-gray-600">Loading...</h1>
        </div>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <Card key={post._id} post={post} />)
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-xl text-gray-600">No posts available</h1>
        </div>
      )}
    </div>
  );
};

export default Blogs;
