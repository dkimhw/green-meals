
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config({path: '.env'});

// Utility function for uploading file to S3
const uploadFileToS3 = async (res, s3, params) => {
  let s3Upload = await s3.upload(params, (err, data) => {
    if (err) {
      res.json(err);
    }
  }).promise();

  return s3Upload;
}

const uploadFiles = async (req, res, recipe_id) => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

    // Create S3 instance which will be used in uploading photo to s3 bucket.
    const s3 = new AWS.S3({
      accessKeyId: accessKeyId,              // accessKeyId that is stored in .env file
      secretAccessKey: secretAccessKey       // secretAccessKey is also store in .env file
    });

    let s3Data = [];
    let files = req.files;

    for (let file of files) {
      let params = {
        Bucket: bucketName,
        Key: recipe_id + ' - ' + file.originalname, // Name of image - should combine with reciped id
        // Key: req.user._id + req.file.originalname,
        Body: file.buffer,                    // Body which will contain the image in buffer format
        ContentType: "image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
      };
      let s3ImageData = await uploadFileToS3(res, s3, params);
      s3Data.push(s3ImageData);
    }

    return s3Data;
  } catch (err) {
    res.json(err);
  }
};

export default uploadFiles;
