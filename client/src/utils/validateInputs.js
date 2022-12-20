
// https://www.positronx.io/react-form-validation-tutorial-with-example/

// Give a function: fieldName, e.event.target or state value, and error message
const isValidNumberOfImagesUploaded = (imagesArr, limit, event) => {
  if (imagesArr.length > limit) {
    event.preventDefault();
    return [false, `Cannot upload more than ${limit} images`];
  } else {
    return [true, null];
  }
}

const isValidImageSize = (imagesArr, fileSizeLimit, event) => {
  for (let file of imagesArr) {
    let fileSize = file.size / 1024;
    if (fileSize > fileSizeLimit) {
      event.preventDefault();
      return [false, `One or more images are over the file size limit (max ${fileSizeLimit} bytes)`];
    }
  }

  return [true, null];
}

export const isValidImagesUploaded = (imagesArr, numOfFiles, fileSizeLimit, event) => {
  let errors = [];
  let imageSizeError = isValidImageSize(imagesArr, fileSizeLimit, event);
  let numOfImagesError = isValidNumberOfImagesUploaded(imagesArr, numOfFiles, event);

  errors.push(imageSizeError);
  errors.push(numOfImagesError);

  return errors;
}
