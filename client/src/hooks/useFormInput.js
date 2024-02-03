import { useState } from 'react';

const useFormInput = (validateInputValue, initialValues = '') => {
  const [enteredValue, setEnteredValue] = useState(initialValues);
  const [isTouched, setIsTouched] = useState(false);
  const [serverSideError, setServerSideError] = useState(false);
  const [serverSideErrorMsgs, setServerSideErrorMsgs] = useState([]);

  // Validate and check for errors if input has been touched
  const validation = validateInputValue(enteredValue);
  const valueIsValid = validation['isValid'];
  const errMsg = validation['errorMsg'];
  const hasError = !valueIsValid && isTouched;

  // Handler for server side error
  const serverSideErrorHandler = (val) => {
    setServerSideError(val);
  }

  // Handler fo blur event
  const blurInputHandler = () => {
    setIsTouched(true);
  };

  // Handler for input value change
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);

    setServerSideError(false)
  };

  // Reset form after submissions
  const resetInput = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    setEnteredValue,
    isValid: valueIsValid,
    hasError,
    errMsg,
    blurInputHandler,
    valueChangeHandler,
    resetInput,
    serverSideError,
    serverSideErrorHandler,
    serverSideErrorMsgs,
    setServerSideErrorMsgs,
  };
}

export default useFormInput
