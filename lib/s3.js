import S3 from "aws-sdk/clients/s3";
import fs from "fs";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

// uploads a file to s3
export function uploadFile(file, saveName) {
    const fileStream = fs.createReadStream(file.filepath);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: saveName,
    };

    // console.log("upload params", uploadParams);

    return s3.upload(uploadParams).promise();
}

// downloads a file from s3
export function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    };
    return s3.getObject(downloadParams).createReadStream();
    // return s3.getObjectAttributes(downloadParams);
}
