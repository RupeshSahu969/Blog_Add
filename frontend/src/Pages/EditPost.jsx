import React, { useEffect, useState } from 'react';
import { fetchPostById, updatePost } from '../Api/api';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', content: '' });
  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: '', isError: false });

  // Load existing post data
  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetchPostById(id);
        setForm({ title: res.data.title, content: res.data.content });
        if (res.data.imageUrl) setExistingImageUrl(res.data.imageUrl);
      } catch (err) {
        setModal({ isOpen: true, message: 'Failed to fetch post data.', isError: true });
      }
    };
    loadPost();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setExistingImageUrl(''); // Clear old preview if new image selected
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.title || !form.content) {
      setModal({ isOpen: true, message: 'Title and content are required.', isError: true });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      if (image) formData.append('image', image);

      // Debug formData contents:
      // for (const pair of formData.entries()) console.log(pair[0], pair[1]);

      await updatePost(id, formData); // API should handle multipart/form-data

      setModal({ isOpen: true, message: 'Post updated successfully!', isError: false });

      setTimeout(() => {
        setModal({ isOpen: false, message: '', isError: false });
        navigate(`/post/${id}`);
      }, 2000);
    } catch (err) {
      setModal({
        isOpen: true,
        message: err.response?.data?.message || 'Login Here Not authorized.',
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mt-10 p-6 shadow bg-white rounded-md"
        encType="multipart/form-data"
      >
        <h2 className="text-xl mb-4 font-semibold text-gray-800">Edit Post</h2>

        <input
          name="title"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          className="w-full border p-2 mb-4 h-40 rounded"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        />

        {/* Existing image preview */}
        {existingImageUrl && (
          <div className="mb-4">
            <p className="mb-1 font-semibold text-gray-700">Current Image:</p>
            <img src={existingImageUrl} alt="Post" className="max-h-48 rounded" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition duration-300 font-semibold flex justify-center items-center"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          )}
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>

      {modal.isOpen && (
        <Modal
          message={modal.message}
          onClose={() => setModal({ ...modal, isOpen: false })}
          isError={modal.isError}
        />
      )}
    </>
  );
};

export default EditPost;
