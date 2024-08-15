import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center fixed w-full h-20 bg-white z-10 border-b border-black px-4 sm:px-8 md:px-16 lg:px-32">
      <div>
        <Link to={"/"}>
          <h1 className="text-3xl font-bold font-serif tracking-tight">
            Pensieve
          </h1>
        </Link>
      </div>
      {user ? (
        <div className="flex justify-end sm:justify-between items-center w-full">
          <div className="hidden sm:flex ml-6 items-center">
            <div className="bg-gray-100 text-black py-3 pr-2 pl-4 rounded-l-3xl">
              <CiSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 py-2 px-2 outline-none rounded-r-3xl"
            />
          </div>
          <div className="flex items-center gap-8">
            <Link to={"/create"}>
              <div className="hidden md:flex items-center gap-1">
                <IoCreateOutline size={20} />
                Write
              </div>
            </Link>
            <div>
              <Link to={"/profile"}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src="https://picsum.photos/100"
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                )}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6 text-sm">
          <div className="hidden md:flex">
            <ul className="flex items-center gap-6 text-sm">
              <li className="hover:text-green-600">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="hover:text-green-600">
                <Link to={"/"}>About</Link>
              </li>
              <li className="hover:text-green-600">
                <Link to={"/"}>Write</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link to={"/signin"}>
              <button className="hidden sm:flex hover:text-green-600">
                Sign in
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="text-white bg-black px-4 py-2 rounded-3xl hover:text-green-600">
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
