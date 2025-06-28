require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./router/authRoutes');
const postRoutes = require('./router/postRoutes');
const { notFound, errorHandler } = require('./utils/errorHandler');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);

// Middleware for 404 and error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err.message);
  });
