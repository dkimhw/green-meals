
import React from 'react';
import { TextField, FormControl, MenuItem, Select, InputLabel, FormHelperText } from '@mui/material';
import classes from './RecipeTimeFormSection.module.css';

const RecipeTimeFormSection = (props) => {

  return (
    <React.Fragment>
      <div className={classes['form-group']}>
        <TextField
          id="prep-time"
          name="prepTime"
          variant="outlined"
          label="Prep Time"
          type="number"
          value={props.prepTime || ''}
          error={props.hasPrepTimeInputError || props.prepTimeServerSideError}
          helperText={props.hasPrepTimeInputError ? props.prepTimeErrorMsg : '' || props.prepTimeServerSideError ? props.prepTimeServerSideErrorMsgs[0] : ''}
          onChange={props.prepTimeChangeHandler}
          onBlur={props.prepTimeBlurInputHandler}
        />
        <FormControl fullWidth error={props.hasPrepTimeTypeInputError || props.prepTimeTypeServerSideError}>
          <InputLabel id="prep-time-type">Prep Time Qty</InputLabel>
          <Select
            labelId="prep-time-type-label"
            id="prep-time-type"
            label="prepTimeType"
            name="prepTimeType"
            // error={props.prepTimeTypeServerSideError}
            // helperText={props.prepTimeTypeServerSideError ? props.prepTimeTypeServerSideErrorMsgs[0] : ''}
            value={props.prepTimeType}
            onChange={props.prepTimeTypeChangeHandler}
            onBlur={props.prepTimeTypeBlurInputHandler}
          >
            <MenuItem value={'minutes'}>minutes</MenuItem>
            <MenuItem value={'hours'}>hours</MenuItem>
            <MenuItem value={'days'}>days</MenuItem>
            <MenuItem value={'blah'}>blah</MenuItem>
          </Select>
          {props.hasPrepTimeTypeInputError ? <FormHelperText>{props.prepTimeTypeErrorMsg}</FormHelperText> : '' || props.prepTimeTypeServerSideError ? <FormHelperText>{props.prepTimeTypeServerSideErrorMsgs[0]}</FormHelperText> : ''}
        </FormControl>
      </div>
      <div className={classes['form-group']}>
        <TextField
          id="cooking-time"
          name="cookingTime"
          variant="outlined"
          label="Cooking Time"
          type="number"
          value={props.cookingTime || ''}
          error={props.hasCookingTimeInputError || props.cookingTimeServerSideError}
          helperText={props.hasCookingTimeInputError ? props.cookingTimeErrorMsg : '' || props.cookingTimeServerSideError ? props.cookingTimeServerSideErrorMsgs[0] : ''}
          onChange={props.cookingTimeChangeHandler}
          onBlur={props.cookingTimeBlurInputHandler}
        />
        <FormControl fullWidth error={props.hasCookingTimeTypeInputError}>
          <InputLabel id="cooking-time-type">Cooking Time Qty</InputLabel>
          <Select
            labelId="cooking-time-type-label"
            id="cooking-time-type"
            name="cookingTimeType"
            label="cookingTimeType"
            value={props.cookingTimeType}
            onChange={props.cookingTimeTypeChangeHandler}
            onBlur={props.cookingTimeTypeBlurInputHandler}
          >
            <MenuItem value={'minutes'}>minutes</MenuItem>
            <MenuItem value={'hours'}>hours</MenuItem>
            <MenuItem value={'days'}>days</MenuItem>
            <MenuItem value={'blah'}>blah</MenuItem>
          </Select>
          {props.hasCookingTimeTypeInputError ? <FormHelperText>{props.cookingTimeTypeErrorMsg}</FormHelperText> : ''}
        </FormControl>
      </div>
    </React.Fragment>
  );
}

export default RecipeTimeFormSection
