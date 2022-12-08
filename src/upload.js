const AWSSDK = require("aws-sdk");
const s3 = new AWSSDK.S3();

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

module.exports.handler = async (event, context) =>{
    console.dir(event);
    console.dir(context);

    const response = {
        isBaseEncoded:false,
        statusCode:200,
        body:JSON.stringify({message:"Successfully Upload the file to s3"})
    }

    try {
const parseBody = JSON.parse(response);
const base64File= parseBody.file;
const decodeFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/,""));
const params ={
    Bucket:BUCKET_NAME,
    Key:`image/${new Date().toISOString()}.jpeg`,
    body:decodeFile,
    ContentType: "image/jpeg",
}
 const uploadResult = await s3.upload(params).promise();
 response.body = JSON.stringify({message:"Successfully Upload the file to s3", uploadResult});


    }catch(e){
console.error(e);
response.body = JSON.stringify({message:"File Failed  Upload the file to s3"});
response.statusCode= 500;

    }

    return response;

}