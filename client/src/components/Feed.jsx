import React from "react";
import Blogs from "./Blogs";
import Suggestions from "./Suggestions";
import Navbar from "./Navbar";

const Feed = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-end">
        <Blogs />
        <Suggestions />
      </div>
    </div>
  );
};

export default Feed;
