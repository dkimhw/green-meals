import React from 'react'
import { TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import classes from './RecipeInfoFormSection.module.css'


// servings unit
// notes section
// public/private
// Add time section?
const RecipeInfoFormSection = (props) => {
  return (
    <React.Fragment>
      <TextField
        id="recipe-name"
        name="recipeName"
        placeholder="Write your recipe name here..."
        variant="standard"
        label="Recipe Name"
        className={classes['form-input']}
        InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
        value={props.recipeInfo.recipeName || ''}
        onChange={props.handleRecipeInfoChange}
      />
      <TextField
        id="recipe-description"
        label="Recipe Description"
        name="recipeDescription"
        multiline
        variant="standard"
        rows={4}
        placeholder="Write your recipe description here..."
        className={classes['form-input']}
        InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
        value={props.recipeInfo.recipeDescription || ''}
        onChange={props.handleRecipeInfoChange}
      />
      <div className={classes['form-group']}>
        <TextField
          id="prep-time"
          name="prepTime"
          variant="outlined"
          label="Prep Time"
          type="number"
          // className={classes['form-input']}
          // InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
          value={props.recipeInfo.prepTime}
          onChange={props.recipeInfo.handleRecipeInfoChange}
        />
        <FormControl fullWidth>
          <InputLabel id="prep-time-type">Prep Time Qty</InputLabel>
          <Select
            labelId="prep-time-type-label"
            id="prep-time-type"
            label="prepTimeType"
            defaultValue="mins"
            value={props.recipeInfo.prepTimeType}
            onChange={props.recipeInfo.handleRecipeInfoChange}
            >
            <MenuItem value={'mins'}>mins</MenuItem>
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
          // className={classes['form-input']}
          // InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
          value={props.recipeInfo.cookingTime}
          onChange={props.recipeInfo.handleRecipeInfoChange}
        />
        <FormControl fullWidth>
          <InputLabel id="cooking-time-type">Cooking Time Qty</InputLabel>
          <Select
            labelId="cooking-time-type-label"
            id="cooking-time-type"
            label="cookingTimeType"
            defaultValue="mins"
            value={props.recipeInfo.cookingTimeType}
            onChange={props.recipeInfo.handleRecipeInfoChange}
            >
            <MenuItem value={'mins'}>mins</MenuItem>
            <MenuItem value={'hours'}>hours</MenuItem>
            <MenuItem value={'days'}>days</MenuItem>
          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  )
}

export default RecipeInfoFormSection
