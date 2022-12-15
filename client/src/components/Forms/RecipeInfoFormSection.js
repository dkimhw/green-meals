import React from 'react'
import { TextField, IconButton } from '@mui/material'
import classes from './RecipeInfoFormSection.module.css'
import CloseIcon from '@mui/icons-material/Close';
import FormInputAlert from '../UI/FormInputAlert';

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
        name="images"
        id="formFile"
        multiple
        onChange={props.handleFileInput}
      />
      {props.fileErrors ? props.fileErrors.map((error, idx) => {
        return (
          <FormInputAlert key={idx} msg={error} />
        );
      }) : "" }
      {props.filesData ? props.filesData.map( (file, idx) => {
        return (<div className={classes['img-group']} key={idx}>
          <img
            id={`image-${idx}`}
            name={`image-${idx}`}
            src={file}
            className={classes['uploaded-img']}
            alt=""
          />
          <IconButton aria-label="remove image" component="label" onClick={() => props.removeFileInput(idx)}>
            <CloseIcon sx={{fontSize: '1.75rem'}}/>
          </IconButton>
        </div>) }) : ""}
    </React.Fragment>
  )
}

export default RecipeInfoFormSection
