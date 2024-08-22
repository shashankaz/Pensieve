import React from "react";
import { Link } from "react-router-dom";

const Cover = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-24 gap-4 h-[calc(100vh-4rem)] px-4 dark:bg-gray-900">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-gray-900 dark:text-gray-100">
        Be part of a <br />
        <span className="font-bold">better internet</span>
      </h1>
      <p className="text-lg sm:text-xl my-6 text-gray-700 dark:text-gray-300">
        Read. Write. Deepen your understanding.
      </p>
      <Link to="/signup">
        <button className="btn41-43 btn-41 rounded-3xl px-6 sm:px-8 md:px-10 py-2 font-semibold text-xs sm:text-sm text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
          Join the Community
        </button>
      </Link>
    </div>
  );
};

export default Cover;
