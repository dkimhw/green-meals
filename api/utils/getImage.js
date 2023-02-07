import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config({path: 'private/.env'});

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,              // accessKeyId that is stored in .env file
  secretAccessKey: secretAccessKey       // secretAccessKey is also store in .env file
});

const getImage = async (imageName) => {
  try {
    let params = {
      Bucket: bucketName,
      Key: imageName
    }

    let imageUrl = await s3.getSignedUrlPromise('getObject', params);
    return imageUrl;
  } catch (err) {
    return err;
  }

};

export default getImage;
