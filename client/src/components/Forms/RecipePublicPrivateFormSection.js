
import React from 'react';
import { FormControlLabel, FormLabel, FormControl, Radio, RadioGroup } from '@mui/material'

const RecipePublicPrivateFormSection = (props) => {
  return (
    <FormControl>
      <FormLabel id="private-public-radio-buttons-group-label">Make this recipe public?</FormLabel>
      <RadioGroup
        aria-labelledby="private-public-radio-buttons-group-label"
        defaultValue="public"
        name="private-public-radio-input"
        value={props.recipeInfo.recipePrivacyStatus}
        onChange={props.handleRecipeInfoChange}
      >
        <FormControlLabel value="public" control={<Radio />} label="Public" />
        <FormControlLabel value="private" control={<Radio />} label="Private" />
      </RadioGroup>
    </FormControl>
  );
}

export default RecipePublicPrivateFormSection;
