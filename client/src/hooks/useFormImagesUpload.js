
// https://github.com/briancodex/react-form-v1/blob/master/src/useForm.js
import { useState, useEffect } from 'react';

const MAX_IMAGES = 3;

const useFormImagesUpload = (validate) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesData, setFilesData] = useState(null);
  const [fileErrors, setFileErrors] = useState([]);

  const handleFileInput = async (event) => {
    let files = event.target.files;
    let newFiles = [...uploadedFiles, ...files]
    let imageValidation = validate(newFiles, MAX_IMAGES, event);
    let isValid = imageValidation[0];
    let errMsg = imageValidation[1];

    // console.log("valid num of images", isValid);

    if (files && files !== undefined && isValid) {
      setUploadedFiles([...uploadedFiles, ...files]);
    }

    console.log(errMsg);
    if (!isValid) {
      setFileErrors([...fileErrors, errMsg]);
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
