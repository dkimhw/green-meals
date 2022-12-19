
// https://github.com/briancodex/react-form-v1/blob/master/src/useForm.js
import { useState, useEffect } from 'react';

const MAX_IMAGES = 3;
const MAX_FILE_SIZE = 4120 // 5MB

const useFormImagesUpload = (validate) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesData, setFilesData] = useState(null);
  const [fileErrors, setFileErrors] = useState([]);

  const handleFileInput = async (event) => {
    let files = event.target.files;
    let newFiles = [...uploadedFiles, ...files]
    let imageValidation = validate(newFiles, MAX_IMAGES, MAX_FILE_SIZE, event);
    let errMsgs = imageValidation.filter(image => image[1]).map(image => image[1]);

    if (files && files !== undefined && errMsgs.length === 0) {
      setUploadedFiles([...uploadedFiles, ...files]);
    }

    console.log("imgArray: ",imageValidation);
    console.log("errMsgs: ", errMsgs);
    if (errMsgs.length > 0) {
      setFileErrors([...fileErrors, ...errMsgs]);
    }
  }

  useEffect(() => {
    const newFilesData = [];
    for (let file of uploadedFiles) {
      newFilesData.push(URL.createObjectURL(file));
    }
    setFilesData(newFilesData);
  }, [uploadedFiles])

  const removeFileInput = (idx) => {
    // Remove the image blob url from file data
    const values = [...filesData];
    values.splice(values.findIndex((value, index) => index === idx), 1);
    setFilesData(values);

    // Remove file data from state uploadedFiles
    const images = [...uploadedFiles];
    images.splice(images.findIndex((value, index)=> index === idx), 1);
    setUploadedFiles(images);
  }

  return { handleFileInput, removeFileInput, uploadedFiles, filesData, fileErrors}
}

export default useFormImagesUpload;
