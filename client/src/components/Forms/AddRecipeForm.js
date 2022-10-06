import React from 'react';
import { TextField, Card } from '@mui/material';
import classes from './AddRecipeForm.module.css';

const AddRecipeForm = () => {

  // https://mui.com/material-ui/react-text-field/
  // Ingredients section
  // Directions section (ability to reorder as well)
  return (
    <Card>
      <form className={classes.form}>
        <TextField
          id="recipe-name"
          name="name"
          placeholder="Write your recipe name here..."
          defaultValue=""
          variant="standard"
          label="Recipe Name"
          className={classes['form-input']}
          InputLabelProps={{ shrink: true, sx: {'fontSize': '1rem'} }}
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
          InputLabelProps={{ shrink: true }}
          />
      </form>
    </Card>
  )

};

export default AddRecipeForm;
