import { useState } from 'react';

const useFormInput = (validateInputValue, initialValues = '') => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // Validate and check for errors if input has been touched
  const validation = validateInputValue(enteredValue);
  const valueIsValid = validation['isValid'];
  const errMsg = validation['errorMsg'];
  console.log(errMsg);
  const hasError = !valueIsValid && isTouched;

  // Handler fo blur event
  const blurInputHandler = () => {
    setIsTouched(true);
  };

  // Handler for input value change
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  }

  // Reset form after submissions
  const resetInput = () => {
    setEnteredValue('');
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    errMsg,
    blurInputHandler,
    valueChangeHandler,
    resetInput
  }
}

export default useFormInput
