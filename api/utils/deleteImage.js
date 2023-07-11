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

export const deleteImage = async (imageName) => {
  try {
    let params = {
      Bucket: bucketName,
      Key: imageName
    }

    let s3Data = await s3.deleteObject(params, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        return data;
      }
    }).promise();
    return s3Data;
  } catch (err) {
    return err;
  }

};

export const deleteImages = async(images) => {
  for (let image of images) {
    deleteImage(image?.image_key);
  }
}
