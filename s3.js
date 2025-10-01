// utils/s3.js
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({ region: process.env.AWS_REGION });

async function uploadToS3(localFilePath, keyName) {
  const fileStream = fs.createReadStream(localFilePath);
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `uploads/${Date.now()}-${keyName}`,
    Body: fileStream,
    ACL: 'private' // or 'public-read' depending on needs
  };
  const command = new PutObjectCommand(params);
  const result = await s3.send(command);
  // v3 PutObjectCommand returns metadata but not a public URL. Construct the URL if you use public ACL:
  const publicUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  return { ...result, Location: publicUrl, Key: params.Key };
}

module.exports = { uploadToS3 };
