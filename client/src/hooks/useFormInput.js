import { useState } from 'react';

const useFormInput = (validateInputValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // Validate and check for errors if input has been touched
  const valueIsValid = validateInputValue(enteredValue);
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
    blurInputHandler,
    valueChangeHandler,
    resetInput
  }
}

export default useFormInput
