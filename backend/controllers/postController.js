const { postModel } = require('../models/postModel');
const path = require('path');
const fs = require('fs');

// CREATE
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;

    const image = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;

    const newPost = new postModel({ title, content, author, image });
    const savedPost = await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: savedPost });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// READ ALL
const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find()
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// READ SINGLE
const getPostById = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id)
      .populate('author', 'username profilePicture');

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await postModel.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete old image if a new one is uploaded
    if (req.file && post.image) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', path.basename(post.image));
      fs.unlink(oldImagePath, err => {
        if (err) console.error('Failed to delete old image:', err);
      });

      post.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    post.title = title || post.title;
    post.content = content || post.content;

    const updated = await post.save();
    res.json({ message: 'Post updated', post: updated });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE
const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete associated image
    if (post.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(post.image));
      fs.unlink(imagePath, err => {
        if (err) console.error('Failed to delete image:', err);
      });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById
};
