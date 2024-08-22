import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="md:h-16 py-6 md:py-0 flex md:items-center md:justify-center dark:bg-black dark:text-white bg-black md:bg-transparent text-white md:text-black border-t border-black dark:border-white px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex md:items-center flex-col md:flex-row justify-center gap-3 md:gap-6 text-sm">
        <Link to="/" className="hover:text-green-600">
          Home
        </Link>
        <Link to="/" className="hover:text-green-600">
          About
        </Link>
        <Link to="/" className="hover:text-green-600">
          Contact
        </Link>
        <Link to="/" className="hover:text-green-600">
          Categories
        </Link>
        <Link to="/" className="hover:text-green-600">
          Privacy Policy
        </Link>
        <Link to="/" className="hover:text-green-600">
          Terms of Service
        </Link>
        <Link to="/" className="hover:text-green-600">
          Sitemap
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
