import React from "react";
import { Link } from "react-router-dom";

const Cover = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-24 gap-4 h-[calc(100vh-4rem)] px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold">
        Be part of a <br />
        <span className="font-bold">better internet</span>
      </h1>
      <p className="text-lg sm:text-xl my-6">
        Read. Write. Deepen your understanding.
      </p>
      <Link to="/signup">
        <button className="text-white bg-black rounded-3xl px-6 sm:px-8 md:px-10 py-2 font-semibold text-xs sm:text-sm">
          Join the Community
        </button>
      </Link>
    </div>
  );
};

export default Cover;
