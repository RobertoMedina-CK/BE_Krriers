// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// // connect to digitalocean spaces
// const s3 = new S3Client({
//   endpoint: "https://krrierswhatsapps.nyc3.digitaloceanspaces.com",
//   forcePathStyle: false,
//   region: "NYC3",
//   credentials: {
//     accessKeyId: 'DO00MKJCLZ7UF8UXUAH6',
//     secretAccessKey: 'IPl4v5DVC8td+eCRu69aoX7ztbuSNQ5ZQ7yLuynVl4E'
//   }
// });

// // upload to digitalocean spaces
// async function uploadFile({ bucket, location, file }) {
//   let key = `${location ? `${location}/` : ""}${file.filename}`;
//   const command = new PutObjectCommand({
//     Key: key,
//     Body: file.buffer,
//     Bucket: bucket,
//     ACL: 'public-read',
//     ContentType: file.mimetype,
//   });
//   await s3.send(command);
//   return key;
// };

// export { uploadFile };

import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import {
  AWS_BUCKET_REGION,
  AWS_PUBLIC_KEY,
  AWS_SECRET_KEY,
  AWS_BUCKET_NAME,
} from "./config.js";
import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  ACL: "public",
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

export async function uploadFile(file) {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
    ACL: "public-read",
    ContentLength: file.size,
    ContentType: file.mimetype,
  };
  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
}

export async function getFiles() {
  const command = new ListObjectsCommand({
    Bucket: AWS_BUCKET_NAME,
  });
  return await client.send(command);
}

export async function getFile(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await client.send(command);
}

export async function downloadFile(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  const result = await client.send(command);
  console.log(result);
  result.Body.pipe(fs.createWriteStream(`./images/${filename}`));
}

export async function getFileURL(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await getSignedUrl(client, command, { expiresIn: 3600 });
}
