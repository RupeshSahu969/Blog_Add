import React, { useState } from 'react';
import { createPost } from '../Api/api';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';

const CreatePost = () => {
  const [form, setForm] = useState({ title: '', content: '' });
  const [image, setImage] = useState(null);
  const [modal, setModal] = useState({ message: '', isError: false, isOpen: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.title || !form.content || !image) {
      setModal({ message: 'All fields including image are required.', isError: true, isOpen: true });
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('image', image);

    setLoading(true); 

    try {
      await createPost(formData);
      setModal({ message: 'Post created successfully!', isError: false, isOpen: true });
      setForm({ title: '', content: '' });
      setImage(null);
      setTimeout(() => {
        setModal({ ...modal, isOpen: false });
        navigate('/');
      }, 1500);
    } catch (error) {
      setModal({
        message: error.response?.data?.message || 'Error creating post.',
        isError: true,
        isOpen: true,
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
        <h2 className="text-xl mb-4 font-semibold">Create Post</h2>

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

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full flex justify-center items-center gap-2 transition disabled:opacity-50"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {loading ? 'Uploading...' : 'Post'}
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

export default CreatePost;
