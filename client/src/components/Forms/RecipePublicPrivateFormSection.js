
import React from 'react';
import { FormControlLabel, FormLabel, FormControl, Radio, RadioGroup, FormHelperText } from '@mui/material'

const RecipePublicPrivateFormSection = (props) => {
  return (
    <FormControl error={props.hasRecipePrivacyStatusInputError}>
      <FormLabel id="private-public-radio-buttons-group-label">Make this recipe public?</FormLabel>
      <RadioGroup
        aria-labelledby="private-public-radio-buttons-group-label"
        name="recipePrivacyStatus"
        value={props.recipePrivacyStatus}
        onChange={props.recipePrivacyStatusChangeHandler}
        onBlur={props.recipePrivacyStatusBlurInputHandler}
      >
        <FormControlLabel value="public" control={<Radio />} label="Public" />
        <FormControlLabel value="private" control={<Radio />} label="Private" />
      </RadioGroup>
      {props.hasRecipePrivacyStatusInputError ? <FormHelperText>{props.recipePrivacyStatusErrorMsg}</FormHelperText> : ''}
    </FormControl>
  );
}

export default RecipePublicPrivateFormSection;
