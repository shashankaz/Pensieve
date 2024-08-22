import React from "react";
import Blogs from "./Blogs";
import Suggestions from "./Suggestions";
import Navbar from "./Navbar";

const Feed = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-end bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <Blogs />
        <Suggestions />
      </div>
    </div>
  );
};

export default Feed;
