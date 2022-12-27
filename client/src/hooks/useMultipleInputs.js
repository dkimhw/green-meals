
import { useState } from 'react';

// Expects default value to have: id, touched, hasError, isvalid
// Is there a way to make this code a bit more efficient and resilient?
const useMultipleInputs = (intialValues, defaultValue, validate) => {
  const [inputArray, setInputArray] = useState(intialValues);

  const validateInput = (val, isTouched, validateFunc) => {
    // Validate
    let validVal = validateFunc(val);
    console.log("validVal: ", validVal);
    let hasError = !validVal[0] && isTouched;
    console.log("hasError: ", hasError);

    return [hasError, validVal[1]];
  }

  const addInput = () => {
    let maxId = Math.max(...inputArray.map(input => input.id));
    maxId < 0 ? maxId = 0 : maxId = maxId + 1;
    defaultValue['id'] = maxId;
    setInputArray([...inputArray, defaultValue]);
  };

  // For this not sure how "order" part will be set for recipe directions
  const removeInput = (id) => {
    console.log(inputArray);
    const values = [...inputArray];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputArray(values);
  };

  const handleChange = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length
    const id = event.target.id.split('-')[splitIdLen - 1];
    let findIdx = inputArray.findIndex(input => input.id === parseInt(id));
    const values = [...inputArray];
    values[findIdx][event.target.name] = event.target.value;

    let isValid = validateInput(event.target.value, true, validate);
    console.log(isValid);
    values[findIdx]['hasError'] = isValid[0];
    values[findIdx]['error'] = isValid[1];
    console.log("values: ", values);

    setInputArray(values);
  };

  const onBlur = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length
    const id = event.target.id.split('-')[splitIdLen - 1];
    let findIdx = inputArray.findIndex(input => input.id === parseInt(id));
    const values = [...inputArray];
    values[findIdx]['touched'] = true;

    // Validate error on blur
    let isValid = validateInput(event.target.value, true, validate);
    console.log(isValid);
    values[findIdx]['hasError'] = isValid[0];
    values[findIdx]['error'] = isValid[1];
    console.log("values: ", values);

    setInputArray(values);
  }

  return {
    inputArray
    , addInput
    , removeInput
    , handleChange
    , onBlur
  }
}


export default useMultipleInputs;
