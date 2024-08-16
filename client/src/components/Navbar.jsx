import React from "react";
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav
      className={`${
        user ? "bg-white" : "bg-transparent"
      } flex justify-between items-center fixed w-full h-20 border-b border-black px-4 sm:px-8 md:px-16 lg:px-32 transition-colors duration-300`}
    >
      <div>
        <Link to={"/"}>
          <h1 className="text-3xl font-bold font-serif tracking-tight">
            Pensieve
          </h1>
        </Link>
      </div>
      {user ? (
        <div className="flex items-center gap-8">
          <Link to={"/create"}>
            <div className="hidden md:flex items-center gap-1 hover:text-green-600 transition-colors duration-300">
              <IoCreateOutline size={20} />
              Write
            </div>
          </Link>
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
              <button className="text-white bg-black px-4 py-2 rounded-3xl hover:bg-green-600 transition-colors duration-300">
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
