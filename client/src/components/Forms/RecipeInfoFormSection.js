import React from 'react'
import { TextField } from '@mui/material'
import classes from './RecipeInfoFormSection.module.css'

// Image preview: https://stackoverflow.com/questions/69035352/how-to-show-image-upload-previews-with-react
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
        id="serving-size"
        name="servingSize"
        variant="outlined"
        label="Servings"
        type="number"
        className={classes['form-input']}
        value={props.recipeInfo.servingSize || ''}
        onChange={props.handleRecipeInfoChange}
      />
      Upload an Image
      <input
        type="file"
        name="image"
        id="formFile"
        onChange={props.handleFileInput}

      />
    </React.Fragment>
  )
}

export default RecipeInfoFormSection
