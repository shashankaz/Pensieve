import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 sm:text-8xl">
          404
        </h1>
        <p className="text-2xl mt-4 text-gray-600 dark:text-gray-300 sm:text-3xl">
          Page Not Found
        </p>
        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Oops! The page you are looking for doesn’t exist. It might have been
          moved or deleted.
        </p>
        <div className="mt-8">
          <button
            onClick={handleGoHome}
            className="bg-green-500 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-2 px-6 rounded sm:px-8 sm:py-3 sm:text-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
