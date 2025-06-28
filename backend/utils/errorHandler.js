
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
};

 const notFound = (req, res) => {
  res.status(404).json({ 
    success: false,
    statusCode: 404,
    message: 'Endpoint not found' 
  });
};

module.exports={
  errorHandler,
  notFound
}
