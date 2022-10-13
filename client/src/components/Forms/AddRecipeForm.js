import React from 'react';
import { TextField, Card, Typography } from '@mui/material';
import classes from './AddRecipeForm.module.css';
import Divider from '../UI/Divider';

const AddRecipeForm = () => {

  // https://mui.com/material-ui/react-text-field/
  // Ingredients section
  // Directions section (ability to reorder as well)
  return (
    <Card>
      <form className={classes.form}>
        <Divider color={'#ffffff'} borderSize={'1rem'}>Recipe Overview</Divider>
        <Typography variant="body">Uploading personal recipes is easy! Add yours to your favorites!</Typography>
        <TextField
          id="recipe-name"
          name="name"
          placeholder="Write your recipe name here..."
          defaultValue=""
          variant="standard"
          label="Recipe Name"
          className={classes['form-input']}
          InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
        />
        <TextField
          id="recipe-description"
          label="Recipe Description"
          name="description"
          multiline
          variant="standard"
          rows={4}
          placeholder="Write your recipe description here..."
          className={classes['form-input']}
          InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
          />

          <Divider>Recipes</Divider>
      </form>
    </Card>
  )

};

export default AddRecipeForm;
