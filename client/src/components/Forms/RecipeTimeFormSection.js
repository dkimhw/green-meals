
import React from 'react';
import { TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
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
          value={props.recipeInfo.prepTime || ''}
          onChange={props.handleRecipeInfoChange}
        />
        <FormControl fullWidth>
          <InputLabel id="prep-time-type">Prep Time Qty</InputLabel>
          <Select
            labelId="prep-time-type-label"
            id="prep-time-type"
            label="prepTimeType"
            defaultValue="minutes"
            value={props.recipeInfo.prepTimeType}
            onChange={props.handleRecipeInfoChange}
            >
            <MenuItem value={'minutes'}>mins</MenuItem>
            <MenuItem value={'hours'}>hours</MenuItem>
            <MenuItem value={'days'}>days</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes['form-group']}>
        <TextField
          id="cooking-time"
          name="cookingTime"
          variant="outlined"
          label="Cooking Time"
          type="number"
          value={props.recipeInfo.cookingTime || ''}
          onChange={props.handleRecipeInfoChange}
        />
        <FormControl fullWidth>
          <InputLabel id="cooking-time-type">Cooking Time Qty</InputLabel>
          <Select
            labelId="cooking-time-type-label"
            id="cooking-time-type"
            label="cookingTimeType"
            defaultValue="minutes"
            value={props.recipeInfo.cookingTimeType}
            onChange={props.handleRecipeInfoChange}
            >
            <MenuItem value={'minutes'}>mins</MenuItem>
            <MenuItem value={'hours'}>hours</MenuItem>
            <MenuItem value={'days'}>days</MenuItem>
          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  );
}

export default RecipeTimeFormSection