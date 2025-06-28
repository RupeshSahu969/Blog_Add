import React, { useEffect, useState, useContext } from 'react';
import { fetchPostById, deletePost } from '../Api/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import { AuthContext } from '../AuthProvider/AuthContext'; // Your auth context

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useContext(AuthContext); // Auth & user info

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, message: '', isError: false });
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPostById(id)
      .then(res => setPost(res.data))
      .catch(() =>
        setModal({ isOpen: true, message: 'Failed to load post.', isError: true })
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deletePost(id);
      navigate('/');
    } catch (error) {
      const message =
        error.response?.data?.error ||
        (error.response?.status === 403
          ? 'You are not authorized to delete this post.'
          : 'Failed to delete post.');

      setModal({
        isOpen: true,
        message,
        isError: true,
      });

      console.error('Delete failed:', error.response || error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const handleDeleteClick = () => {
    if (!isAuthenticated) {
      setModal({
        isOpen: true,
        message: 'Please login to delete posts.',
        isError: true,
      });
    } else {
      setModal({
        isOpen: true,
        message: 'Are you sure you want to delete this post?',
        isError: false,
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-16 w-16"></div>
      </div>
    );

  if (!post) return null;

  

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 p-4 md:p-8 bg-white rounded shadow-md">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        <h2 className="text-3xl font-bold mb-2 text-gray-900">{post.title}</h2>
        <p className="text-gray-500 mb-6">{new Date(post.createdAt).toLocaleString()}</p>
        <p className="text-gray-700 mb-8 whitespace-pre-line">{post.content}</p>

        <div className="flex gap-4">
          {/* Edit Button */}
          {isAuthenticated ? (
            <Link
              to={`/edit/${post._id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit
            </Link>
          ) : (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-400 text-white rounded cursor-not-allowed"
              title="Login to edit posts"
            >
              Edit
            </button>
          )}

          {/* Delete Button (only visible to author) */}
          {isAuthenticated && (
            <button
              onClick={handleDeleteClick}
              disabled={deleteLoading}
              className={`px-4 py-2 rounded text-white ${
                deleteLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              } transition`}
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      </div>

      {modal.isOpen && (
        <Modal
          message={modal.message}
          isError={modal.isError}
          onClose={() => setModal({ ...modal, isOpen: false })}
          showConfirmButtons={!modal.isError}
          onConfirm={handleDelete}
        />
      )}

      <style>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default SinglePost;
