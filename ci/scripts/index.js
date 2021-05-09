const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const getMimeTypeFor = require('./ExtensionMimeMap');

AWS.config.credentials.accessKeyId = process.env.AWS_ACCESS_KEY_ID
AWS.config.credentials.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const myRegion = 'ap-south-1';
AWS.config.update({region: myRegion});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const cloudfront = new AWS.CloudFront();

const uploadFile = async (bucketName, fromFilePath, toBucketPath) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(fromFilePath);

    fileStream.on('error', function(err) {
      reject(err);
    });

    const extension = "." + fromFilePath.split('.').pop();

    const uploadParams = {
      Bucket: bucketName,
      Key: toBucketPath,
      Body: fileStream,
      ContentType: getMimeTypeFor(extension)
    };

    s3.upload (uploadParams, function (err, data) {
      if (err) {
        return reject(err);
      }
      console.log(`Uploaded : ${fromFilePath} to ${bucketName}:${toBucketPath}`, uploadParams.ContentType)
      resolve(data);
    });
  });
}

const getAllFilesInDirRecursively = (dirPath) => {
  return new Promise((resolve) => {
    fs.readdir(dirPath, async (error, directFilesInDir) => {
      const files = [];
      const dir = [];
      for(let file of directFilesInDir){
        const absolutePath = path.join(dirPath, file);
        const isDir = fs.statSync(absolutePath).isDirectory();
        isDir ? dir.push(absolutePath) : files.push(absolutePath);
      }
      const nestedFiles = await Promise.all(dir.map(getAllFilesInDirRecursively));
      const allRecursiveFiles = nestedFiles.reduce((all, files) => {
        return [
          ...all,
          ...files
        ]
      }, [])
      resolve([...files, ...allRecursiveFiles])
    });
  });
}

const uploadPathToBucket = async (bucketName, fromDirPath, toBucketPath) => {
  const allFiles = await getAllFilesInDirRecursively(fromDirPath);
  return Promise.all(allFiles.map((absoluteFilePath) => {
    const relativePath = path.relative(fromDirPath, absoluteFilePath);
    const pathInBucket = path.join(toBucketPath, relativePath);
    return uploadFile(bucketName, absoluteFilePath, pathInBucket);
  }));
};

const invalidatePath = (path = '/*', reason) => {
  const params = {
    DistributionId: process.env.CLOUD_FRONT_DISTRIBUTION_ID,
    InvalidationBatch: {
      // client generated unique request id to prevent accedental re-runs
      CallerReference: reason,

      // invalidate everything (costs same if only one pattern)
      Paths: {Quantity: 1, Items: [path]}
    }
  };

  return new Promise((resolve, reject) => {
    cloudfront.createInvalidation(params, function(error, data) {
      if (error){
        return reject(error);
      }
      resolve(data);
    });
  });
};

const ensureEnvDefined = (envVarName) => {
  if(!process.env[envVarName]){
    throw `${envVarName} is not found. Please set requried environment variables.`
  }
};

(async() => {
  ensureEnvDefined('AWS_ACCESS_KEY_ID');
  ensureEnvDefined('AWS_SECRET_ACCESS_KEY');
  ensureEnvDefined('S3_BUCKET_NAME');
  ensureEnvDefined('CLOUD_FRONT_DISTRIBUTION_ID');
  ensureEnvDefined('DEPLOYMENT_ID');

  const bucketName = process.env.S3_BUCKET_NAME;
  const fromDir = process.argv[2];
  const toBucketPath = process.argv[3];
  const cacheInvalidationReason = 'Deployment for ${process.env.DEPLOYMENT_ID}';

  console.log("Starting deployment with following parameters : ")
  console.log("Arguments", process.argv.slice(2));
  console.log("bucketName", bucketName);
  console.log("toBucketPath", toBucketPath);
  console.log("fromDir", fromDir);
  console.log("Files to upload: ", await getAllFilesInDirRecursively(fromDir));

  await uploadPathToBucket(bucketName, fromDir, toBucketPath);
  await invalidatePath(
    `/${toBucketPath}/*`,
    cacheInvalidationReason);
})();

