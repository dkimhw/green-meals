
// https://www.positronx.io/react-form-validation-tutorial-with-example/

// Give a function: fieldName, e.event.target or state value, and error message

export const isValidNumberOfImagesUploaded = (imagesArr, limit, event) => {
  if (imagesArr.length > limit) {
    event.preventDefault();
    return [false, `Cannot upload more than ${limit} images`];
  } else {
    return [true, null];
  }
}
