import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import classes from './AddRecipeForm.module.css';
// import Divider from '../UI/Divider';
import AddIngredientsFormSection from './AddIngredientsFormSection';
import FormCard from '../UI/FormCard';
import axios from 'axios';

const initialValues = {
  recipeName: "",
  recipeDescription: "",
}

const AddRecipeForm = () => {
  const [recipeInfo, setRecipeInfo] = useState({
    initialValues
  });

  const handleRecipeInfoChange = async (event) => {
    console.log(recipeInfo);
    setRecipeInfo({ ...recipeInfo, [event.target.name]: event.target.value });
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('submitted');
    console.log(recipeInfo);
    // Send to server
    const recipeFormInfo = {
      recipeName: recipeInfo.recipeName,
      recipeDescription: recipeInfo.recipeDescription,
    };
    let result = await axios.post('http://localhost:5051/api/recipes/create', recipeFormInfo)
    console.log(result);

    // Clear form inputs
    setRecipeInfo({ recipeName: "", recipeDescription: "" });
  }

  // https://mui.com/material-ui/react-text-field/
  // Ingredients section
  // Directions section (ability to reorder as well)
  return (
    <FormCard>
      <form className={classes.form} onSubmit={submitHandler}>
        {/* <Divider color={'#ffffff'} borderSize={'1rem'}>Recipe Overview</Divider>
        <Typography variant="body">Uploading personal recipes is easy! Add yours to your favorites!</Typography> */}
        <TextField
          id="recipe-name"
          name="recipeName"
          placeholder="Write your recipe name here..."
          defaultValue=""
          variant="standard"
          label="Recipe Name"
          className={classes['form-input']}
          InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
          value={recipeInfo.recipeName}
          onChange={handleRecipeInfoChange}
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
          value={recipeInfo.recipeDescription}
          onChange={handleRecipeInfoChange}
        />
        <AddIngredientsFormSection />

        <Button variant="outlined" type="submit">Submit</Button>
      </form>
    </FormCard>
  )

};

export default AddRecipeForm;
