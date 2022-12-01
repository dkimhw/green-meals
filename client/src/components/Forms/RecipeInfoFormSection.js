import React from 'react'
import { TextField } from '@mui/material'
import classes from './RecipeInfoFormSection.module.css'

// public/private section
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
      <TextField
        id="servings"
        name="servings"
        variant="outlined"
        label="Servings"
        type="number"
        className={classes['form-input']}
        value={props.recipeInfo.servings || ''}
        onChange={props.handleRecipeInfoChange}
      />
    </React.Fragment>
  )
}

export default RecipeInfoFormSection
