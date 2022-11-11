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

const ingredientsInputs = [
  { id: 0, ingredient_name: '', placeholder: 'e.g. Flour' },
  { id: 1, ingredient_name: '', placeholder: 'e.g. Sugar' },
  { id: 2, ingredient_name: '', placeholder: 'e.g. Olive oil' },
]


// https://github.com/bradtraversy/react_step_form/tree/master/src/components
// Breaking apart long forms into components
const AddRecipeForm = () => {
  const [recipeInfo, setRecipeInfo] = useState({initialValues});
  const [recipeIngredients, setRecipeIngredients] = useState(ingredientsInputs);

  // Recipe Info changes
  const handleRecipeInfoChange = async (event) => {
    setRecipeInfo({ ...recipeInfo, [event.target.name]: event.target.value });
  }

  // Add new ingredient handlers //
  const addIngredient = () => {
    let maxId = Math.max(...recipeIngredients.map(ingredient => ingredient.id));
    maxId < 0 ? maxId = 0 : maxId = maxId + 1;
    setRecipeIngredients([...recipeIngredients, { id: maxId, ingredient_name: '', placeholder: 'Add a new ingredient' }]);
  };

  const removeIngredient = (id) => {
    const values = [...recipeIngredients];
    values.splice(values.findIndex(value => value.id === id), 1);
    setRecipeIngredients(values);
  };

  const handleIngredientNameChange = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length
    const id = event.target.id.split('-')[splitIdLen - 1];
    let findIdx = recipeIngredients.findIndex(ingredient => ingredient.id === parseInt(id));
    const values = [...recipeIngredients];
    values[findIdx].ingredient_name = event.target.value;
    setRecipeIngredients(values);
  };

  // Submit Recipe Info //
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('submitted');
    console.log('Recipe info:', recipeInfo);
    console.log('Recipe ingredients:', recipeIngredients);
    // Send to server
    const recipeFormInfo = {
      recipeName: recipeInfo.recipeName,
      recipeDescription: recipeInfo.recipeDescription,
      recipeIngredients: recipeIngredients,
    };
    let result = await axios.post('http://localhost:5051/api/recipes/create', recipeFormInfo)
    console.log(result);

    // Clear form inputs
    setRecipeInfo({ recipeName: "", recipeDescription: "" });
  }

  return (
    <FormCard>
      <form className={classes.form} onSubmit={submitHandler}>
        {/* <Divider color={'#ffffff'} borderSize={'1rem'}>Recipe Overview</Divider>
        <Typography variant="body">Uploading personal recipes is easy! Add yours to your favorites!</Typography> */}
        <TextField
          id="recipe-name"
          name="recipeName"
          placeholder="Write your recipe name here..."
          variant="standard"
          label="Recipe Name"
          className={classes['form-input']}
          InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
          value={recipeInfo.recipeName || ''}
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
          value={recipeInfo.recipeDescription || ''}
          onChange={handleRecipeInfoChange}
        />
        <AddIngredientsFormSection
          ingredients={recipeIngredients}
          removeIngredient={removeIngredient}
          addIngredient={addIngredient}
          handleIngredientNameChange={handleIngredientNameChange}
        />

        <Button variant="outlined" type="submit">Submit</Button>
      </form>
    </FormCard>
  )

};

export default AddRecipeForm;
