const { s3 } =require("../config/aws") 

const uploadToS3 = (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  return s3.upload(params).promise();
};
 
const deleteFromS3 = (url) => {
  const key = url.split('/').slice(3).join('/');
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  };

  return s3.deleteObject(params).promise();
};

module.exports={
  uploadToS3,
  deleteFromS3
}