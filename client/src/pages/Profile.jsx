import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingBio, setLoadingBio] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/posts/user/${user.uid}`
          );
          const data = await response.json();
          setPosts(data.posts || []);
          setLoadingPosts(false);
        } catch (error) {
          console.error("Error fetching posts: ", error);
          setLoadingPosts(false);
        }
      };

      const fetchUserBio = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`
          );
          const data = await response.json();
          if (data.success && data.user) {
            setBio(data.user.bio);
          } else {
            await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }
          setLoadingBio(false);
        } catch (error) {
          console.error("Error fetching user bio: ", error);
          setLoadingBio(false);
        }
      };

      fetchPosts();
      fetchUserBio();
    }
  }, [user, navigate]);

  const handleBioUpdate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bio }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Bio updated successfully!");
      } else {
        alert("Error updating bio: " + data.message);
      }
    } catch (error) {
      console.error("Error updating bio: ", error);
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-10 pt-32 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="w-full max-w-2xl">
        <div className="flex gap-8 border-b">
          <button
            className={`text-lg font-semibold pb-2 ${
              activeTab === "profile"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Details
          </button>
          <button
            className={`text-lg font-semibold pb-2 ${
              activeTab === "posts"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Your Posts
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="py-6">
            <div className="flex flex-col">
              {loadingBio ? (
                <p className="text-gray-600">Loading profile...</p>
              ) : (
                <>
                  <div className="w-32 h-32 mb-4">
                    <img
                      src={user.photoURL || "https://picsum.photos/100/100"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-semibold mb-1">
                    {user.displayName}
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                  <input
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-2"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={handleBioUpdate}
                      className="bg-green-600 text-white w-28 mt-6 px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Update Bio
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-green-600 text-white w-28 mt-6 px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="py-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Your Blog Posts ({posts.length})
            </h2>
            {loadingPosts ? (
              <p className="text-gray-600">Loading posts...</p>
            ) : posts.length > 0 ? (
              <ul>
                {posts.map((post) => {
                  const truncatedContent =
                    post.content.length > 150
                      ? post.content.slice(0, 150) + "..."
                      : post.content;

                  return (
                    <Link to={`/blog/${post._id}`} key={post._id} className="">
                      <li className="p-4 bg-gray-50 mb-6 rounded-lg shadow-md hover:shadow-lg">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p
                          className="text-gray-600"
                          dangerouslySetInnerHTML={{ __html: truncatedContent }}
                        ></p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-600">
                You have not created any posts yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
