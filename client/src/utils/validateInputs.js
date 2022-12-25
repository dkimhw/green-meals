
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

export const isValidStringInput = (str) => {
  if (str.trim() === '') {
    return [true, 'Please fill out this field.'];
  } else if (typeof str !== "string" || /[0-9]+/g.test(str)) {
    return [true, 'Please enter a valid input.']
  }

  return [false, null];
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
