import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ThemeContext } from "../utils/ThemeContext";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={`${
        user ? "bg-white" : "bg-transparent"
      } dark:bg-black dark:text-white flex justify-between items-center fixed w-full h-20 border-b border-black dark:border-white px-4 sm:px-8 md:px-16 lg:px-32 transition-colors duration-300`}
    >
      <div>
        <Link to={"/"}>
          <h1 className="text-3xl font-bold font-serif tracking-tight">
            Pensieve
          </h1>
        </Link>
      </div>
      {user ? (
        <div className="flex items-center gap-4 md:gap-8">
          <Link to={"/create"}>
            <div className="flex items-center gap-1 hover:text-green-600 transition-colors duration-300">
              <IoCreateOutline size={20} />
              <div className="hidden md:flex">Write</div>
            </div>
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded">
            {theme === "light" ? (
              <MdDarkMode size={20} />
            ) : (
              <MdLightMode size={20} />
            )}
          </button>
          <Link to={"/profile"}>
            <img
              src={user.photoURL || "https://picsum.photos/100"}
              alt={`${user.displayName || "User"}'s profile`}
              className="w-9 h-9 rounded-full object-cover"
            />
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-6 text-sm">
          <ul className="hidden md:flex items-center gap-6">
            <li className="hover:text-green-600 transition-colors duration-300">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="hover:text-green-600 transition-colors duration-300">
              <Link to={"/"}>About</Link>
            </li>
            <li className="hover:text-green-600 transition-colors duration-300">
              <Link to={"/"}>Write</Link>
            </li>
          </ul>
          <div className="flex items-center gap-6">
            <Link to={"/signin"}>
              <button className="hidden sm:flex hover:text-green-600 transition-colors duration-300">
                Sign in
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="text-white bg-black px-4 py-2 rounded-3xl dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300">
                Get started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
