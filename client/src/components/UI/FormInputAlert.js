
import React from 'react';
import classes from './FormInputAlert.module.css';

const FormInputAlert = (props) => {
  return (
    <div className={classes["form-input-alert"]}>
      { props.msg }
    </div>
  )
}

export default FormInputAlert;
