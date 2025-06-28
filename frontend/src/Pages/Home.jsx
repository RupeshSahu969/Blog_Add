import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../Api/api';
import PostCard from '../Components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);  // new state for error

  useEffect(() => {
    fetchPosts()
      .then(res => {
        setPosts(res.data);
        console.log(res.data)
        setError(null); // clear error if successful
      })
      .catch(err => {
        console.error('Failed to fetch posts:', err);
        setError('Unable to load posts right now. Please try again later.');
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Recent Posts</h1>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      {!error && posts.length > 0 ? (
        posts.map(post => <PostCard key={post._id} post={post} />)
      ) : !error ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : null}
    </div>
  );
};

export default Home;
