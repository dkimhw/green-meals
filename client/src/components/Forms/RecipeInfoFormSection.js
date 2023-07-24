import React from 'react'
import { TextField, IconButton } from '@mui/material'
import classes from './RecipeInfoFormSection.module.css'
import CloseIcon from '@mui/icons-material/Close';
import FormInputAlert from '../UI/FormInputAlert';

// Image preview: https://stackoverflow.com/questions/69035352/how-to-show-image-upload-previews-with-react
const RecipeInfoFormSection = (props) => {
  // console.log("recipe error server side: ", props.recipeNameServerSideError, props.recipeNameServerSideErrorMsgs );
  console.log("info props", props)
  return (
    <React.Fragment>
      <TextField
        id="recipe-name"
        name="recipeName"
        placeholder="Write your recipe name here..."
        variant="outlined"
        label="Recipe Name"
        error={props.hasRecipeNameInputError || props.recipeNameServerSideError}
        helperText={ props.hasRecipeNameInputError ? props.recipeNameErrorMsg : '' || props.recipeNameServerSideError ? props.recipeNameServerSideErrorMsgs[0] : '' }
        className={`${classes['form-input']}`}
        value={props.recipeName || ''}
        onChange={props.recipeNameChangeHandler}
        onBlur={props.recipeNameBlurInputHandler}
      />
      <TextField
        id="recipe-description"
        label="Recipe Description"
        name="recipeDescription"
        multiline
        variant="outlined"
        rows={4}
        placeholder="Write your recipe description here..."
        error={props.hasRecipeDescriptionInputError || props.recipeDescriptionServerSideError }
        helperText={props.hasRecipeDescriptionInputError ? props.recipeDescriptionErrorMsg : '' || props.recipeDescriptionServerSideError ? props.recipeDescriptionServerSideErrorMsgs[0] : ''}
        className={classes['form-input']}
        value={props.recipeDescription || ''}
        onChange={props.recipeDescriptionChangeHandler}
        onBlur={props.recipeDescriptionBlurInputHandler}
      />
      <TextField
        id="serving-size"
        name="servingSize"
        variant="outlined"
        label="Servings"
        type="number"
        error={props.hasServingSizeInputError || props.servingSizeServerSideError}
        helperText={props.hasServingSizeInputError ? props.servingSizeErrorMsg : '' || props.servingSizeServerSideError ? props.servingSizeServerSideErrorMsgs[0] : ''}
        className={classes['form-input']}
        value={props.servingSize || ''}
        onChange={props.servingSizeChangeHandler}
        onBlur={props.servingSizeBlurInputHandler}
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
