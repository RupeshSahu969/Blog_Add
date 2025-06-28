import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6 hover:shadow-lg transition-shadow duration-300
                    max-w-full sm:max-w-lg md:max-w-xl mx-auto">
      
      {/* Optional image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
        {post.title}
      </h2>

      <p className="text-gray-700 mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
        {post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content}
      </p>

      <Link
        to={`/post/${post._id}`}
        className="inline-block text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
        aria-label={`Read more about ${post.title}`}
      >
        Read More →
      </Link>
    </div>
  );
};

export default PostCard;
