import * as AWS from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
import { Types } from 'aws-sdk/clients/s3';
//const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStorage logic

//const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const s3: Types = new AWS.S3({
    signatureVersion: 'v4'
  }) 

export function generateUploadUrl(imageId: string,bucketName: string) {
  //const bucketName = process.env.IMAGES_S3_BUCKET  
  return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: imageId,
      Expires: 3000
    })
  }