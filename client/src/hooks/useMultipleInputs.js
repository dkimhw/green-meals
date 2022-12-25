
import { useState } from 'react';

const useMultipleInputs = (intialValues, defaultValue, validate) => {
  const [inputArray, setInputArray] = useState(intialValues);

  const addInput = () => {
    let maxId = Math.max(...inputArray.map(input => input.id));
    maxId < 0 ? maxId = 0 : maxId = maxId + 1;
    defaultValue['id'] = maxId // Need to make it less manual - I assume upfront there is an id in defaultValue
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

    // Validate
    let validVal = validate(event.target.value);
    console.log("validVal: ", validVal);
    // let hasError = !validVal[0]// && values[findIdx]['touched'];

    values[findIdx]['hasError'] = validVal[0];
    values[findIdx]['error'] = validVal[1];
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
