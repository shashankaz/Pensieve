import React, { useEffect, useState } from "react";
import Card from "./Card";

const Blogs = () => {
  const [posts, setPosts] = useState([]);

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
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 pt-20 my-10 w-full lg:pr-[30%]">
      {posts.length > 0 ? (
        posts.map((post) => <Card key={post._id} post={post} />)
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-xl">No posts available</h1>
        </div>
      )}
    </div>
  );
};

export default Blogs;
