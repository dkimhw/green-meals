
import { useState } from 'react';

// Expects default value to have: id, touched, hasError, isvalid
const useMultipleInputs = (intialValues, defaultValue, validate, groupValidate=null, groupValidateErrorMsg=null) => {
  const [inputArray, setInputArray] = useState(intialValues);

  // Group validation
  const [groupInputsTouched, setGroupInputsTouched] = useState(false);

  const validation = groupValidate ? groupValidate(inputArray, groupValidateErrorMsg) : null;
  let valueIsValid;
  let groupInputsErrorMsg;
  let hasGroupInputsError

  if (validation) {
    valueIsValid = validation['isValid'];
    groupInputsErrorMsg = validation['errorMsg'];
    hasGroupInputsError = !valueIsValid && groupInputsTouched;
  }


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
    const values = [...inputArray];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputArray(values);
  };

  const handleChange = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length;
    const id = event.target.id.split('-')[splitIdLen - 1];
    let findIdx = inputArray.findIndex(input => input.id === parseInt(id));
    const values = [...inputArray];
    values[findIdx][event.target.name] = event.target.value;

    let validated = validateInput(event.target.value, true, validate);
    values[findIdx]['hasError'] = validated['hasError'];
    values[findIdx]['errorMsg'] = validated['errorMsg'];

    setInputArray(values);
    setGroupInputsTouched(true);
  };

  const onBlur = (event) => {
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
    setGroupInputsTouched(true);
  }

  const onSubmitValidate = (inputType) => {
    const values = [...inputArray];
    for (const input of values) {
      input.touched = true;
      let validated = validateInput(input[inputType], true, validate);
      input['hasError'] = validated['hasError'];
      input['errorMsg'] = validated['errorMsg'];
    }
    setInputArray(values);
    setGroupInputsTouched(true);
  }

  return {
    inputArray
    , setInputArray
    , addInput
    , removeInput
    , handleChange
    , onBlur
    , onSubmitValidate
    , groupInputsErrorMsg
    , hasGroupInputsError
  }
}


export default useMultipleInputs;
