
import { useState } from 'react';

// Expects default value to have: id, touched, hasError, isvalid
// Is there a way to make this code a bit more efficient and resilient?
const useMultipleInputs = (intialValues, defaultValue, validate) => {
  const [inputArray, setInputArray] = useState(intialValues);

  const validateInput = (val, isTouched, validateFunc) => {
    // Validate
    let validVal = validateFunc(val);
    let hasError = !validVal['isValid'] && isTouched;

    return { hasError: hasError, errorMsg: validVal['errorMsg'] };
  }

  const addInput = () => {
    let maxId = Math.max(...inputArray.map(input => input.id));
    maxId < 0 ? maxId = 0 : maxId = maxId + 1;
    defaultValue['id'] = maxId;
    setInputArray([...inputArray, defaultValue]);
  };

  // For this not sure how "order" part will be set for recipe directions
  const removeInput = (id) => {
    console.log("id", id);
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

    let validated = validateInput(event.target.value, true, validate);
    console.log(validated)
    values[findIdx]['hasError'] = validated['hasError'];
    values[findIdx]['errorMsg'] = validated['errorMsg'];

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
    let validated = validateInput(event.target.value, true, validate);
    values[findIdx]['hasError'] = validated['hasError'];
    values[findIdx]['errorMsg'] = validated['errorMsg'];

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
