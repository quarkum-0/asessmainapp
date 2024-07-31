          // const image = await updateImage("newSite/Assess/Assess-202404271195.png", file64, file.name, "Assess")
          // const image = await deleteImage('newSite/Assess/Assess-202404271358.png')
        //   const image = await uploadImage(file64, file.name, "Assess")

import AWS from 'aws-sdk';
import { toast } from 'react-toastify';
const s3Client = new AWS.S3({
    endpoint: "https://s3.amazonaws.com",
    region: "ap-south-1",
    credentials: {
      accessKeyId: "",
      secretAccessKey: ""
    }
  })

export async function uploadImage(file64,fileName,type) {
    const id = toast.loading("Uploading Please wait...");
    const fileKey = generateKey(fileName,type)
    try {
      const params = {
        Bucket: "atomprodtest",
        Key: `${fileKey}`,
        Body: Buffer.from(file64, 'base64'),
      };
      const uploadPromise = s3Client.upload(params);
      uploadPromise.on('httpUploadProgress', (progresss) => {
        const percentage = Math.round((progresss.loaded / progresss.total) * 100);
        toast.update(id, { render: "file Uploading..." + " " + percentage + "%", isLoading: true });
      });
      const response = await uploadPromise.promise();
      console.log("S3 Upload Response:", response);
      toast.update(id, { render: "File uploaded successfully", type: "success", isLoading: false, autoClose: 2000 });
      return (`${fileKey}`)
    } catch (error) {
      console.log(error);
      toast.update(id, { render: "File upload failed", type: "error", isLoading: false, autoClose: 2000 });
    }
}

export async function updateImage(key,file64,fileName,type){
    console.log(key);
    const id = toast.loading("Uploading Please wait...");
    try {
      const paramsDel = {
        Bucket: "atomprodtest",
        Key: key,
      };
      s3Client.deleteObject(paramsDel, (err, data) => {
        if (err) {
          console.error("Error deleting object:", err);
        } else {
          console.log(data);
          toast.update(id, {
            render: "Old File Deleting successfully",
            isLoading: true,
          });
        }
      });
      const fileKey = generateKey(fileName,type)
      const params = {
        Bucket: "atomprodtest",
        Key: `${fileKey}`,
        Body: Buffer.from(file64, "base64"),
      };
      const uploadPromise = s3Client.upload(params);
      uploadPromise.on("httpUploadProgress", (progresss) => {
        // Calculate the percentage of completion
        const percentage = Math.round(
          (progresss.loaded / progresss.total) * 100
        );
        toast.update(id, {
          render: "file Updating..." + " " + percentage + "%",
          isLoading: true,
        });
      });
      const response = await uploadPromise.promise();
      console.log("S3 Upload Response:", response);
      toast.update(id, {
        render: "File updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      return `${fileKey}`;
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: "File update failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
}

export async function deleteImage(keyValue){
    const id = toast.loading("Deleting Please wait...");
    console.log(keyValue);
    try {
      const params = {
        Bucket: "atomprodtest",
        Key: keyValue,
      };
      s3Client.deleteObject(params, (err, data) => {
        if (err) {
          console.error('Error deleting object:', err);
        } else {
          console.log(data);
          toast.update(id, { render: "File Deleting successfully", type: "success", isLoading: false, autoClose: 2000 });
        }
      })
    } catch (error) {
      console.log(error);
      toast.update(id, { render: "File Deleting failed", type: "error", isLoading: false, autoClose: 2000 });
    }
}

function generateKey(fileName,type) {
    if (fileName) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      month = month < 10 ? `0${month}` : month; // Ensure month is two digits
      let day = currentDate.getDate();
      day = day < 10 ? `0${day}` : day; // Ensure day is two digits
      const randomFourDigits = Math.floor(1000 + Math.random() * 9000); 
      const idNumber = `newSite/${type}/${type}-${year}${month}${day}${randomFourDigits}`;
      const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
      return `${idNumber}.${fileExtension}`;
    }
}