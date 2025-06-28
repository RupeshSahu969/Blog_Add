const express = require('express');
const { auth } = require('../middleware/auth');
const { singleUpload } = require('../middleware/upload');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

const router = express.Router();

router.post('/', auth, singleUpload('image'), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', auth, singleUpload('image'), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
