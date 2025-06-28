const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 image: {
  type: String, // store image URL
  default: null
}
,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });

const postModel=mongoose.model('Post', postSchema);

module.exports={
  postModel
}