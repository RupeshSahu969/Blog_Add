import axios from 'axios';

const API_BASE = 'https://bloag-assiment-deploy.onrender.com/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Attach JWT token automatically if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (userData) => api.post('/login', userData);
export const logoutUser = (userData) => api.post('/logout', userData);

export const fetchPosts = () => api.get('/posts');
export const fetchPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (postData) => api.post('/posts', postData);
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export default api;
