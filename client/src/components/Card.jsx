import React from "react";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";

const Card = ({ post }) => {
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const truncatedContent =
    post.content.length > 150
      ? post.content.slice(0, 150) + "..."
      : post.content;

  return (
    <Link to={`/blog/${post._id}`}>
      <div className="mb-6 py-6 border-b">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-6 rounded-full bg-black overflow-hidden">
            <img
              src="https://picsum.photos/100"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-700 text-sm">{post.author.name}</p>
        </div>
        <div className="flex flex-row items-start gap-6 md:gap-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {post.title}
            </h1>
            <p
              className="text-gray-700 mb-4 font-semibold line-clamp-3"
              dangerouslySetInnerHTML={{ __html: truncatedContent }}
            ></p>
          </div>
          <div className="w-24 h-16 md:w-48 md:h-32 bg-gray-200 rounded-sm overflow-hidden">
            <img
              src="https://picsum.photos/150"
              alt="Blog Preview"
              className="w-full h-full object-cover hover:scale-110 transition-transform"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
          <div>{formattedDate}</div>
          {/* <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <AiFillLike color="#374151" />
              {post.likes}
            </div>
            <div className="flex items-center gap-1">
              <FaComment color="#374151" />
              {post.commentsCount}
            </div>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
