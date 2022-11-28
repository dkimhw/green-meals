import React from 'react';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import classes from './AddRecipeForm.module.css';
import IngredientsFormSection from './IngredientsFormSection';
import RecipeInstructionsFormSection from './RecipeInstructionsFormSection';
import RecipeInfoFormSection from './RecipeInfoFormSection';
import RecipeNotesFormSection from './RecipeNotesFormSection';
import FormCard from '../UI/FormCard';
import Divider from '../UI/Divider';
import axios from 'axios';

const initialValues = {
  recipeName: "",
  recipeDescription: "",
  prepTime: "",
  prepTimeType: "mins",
  cookinTime: "",
  cookinTimeType: "mins",
  recipeNotes: "",
}

const ingredientsInputs = [
  { id: 0, ingredient_name: '', placeholder: 'e.g. Flour' },
  { id: 1, ingredient_name: '', placeholder: 'e.g. Sugar' },
  { id: 2, ingredient_name: '', placeholder: 'e.g. Olive oil' },
]

const recipeInstructionsIntitalValue = [
  { id: 0, order: 1, instruction: '', placeholder: 'e.g. Preheat oven to 350 degrees F.' },
  { id: 1, order: 2, instruction: '', placeholder: 'Add another instruction' },
  { id: 2, order: 3, instruction: '', placeholder: 'Add another instruction' },
]

// https://github.com/bradtraversy/react_step_form/tree/master/src/components
// Breaking apart long forms into components
const AddRecipeForm = () => {
  const [recipeInfo, setRecipeInfo] = useState({initialValues});
  const [recipeIngredients, setRecipeIngredients] = useState(ingredientsInputs);
  const [recipeInstructions, setRecipeInstructions] = useState(recipeInstructionsIntitalValue);

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

  // Recipe instructions handlers //
  const addRecipeInstruction = () => {
    let maxId = Math.max(...recipeInstructions.map(instruction => instruction.id));
    maxId < 0 ? maxId = 0 : maxId = maxId + 1;
    setRecipeInstructions([...recipeInstructions, { id: maxId, order: maxId + 1, instruction: '', placeholder: 'Add another instruction' }]);
  };

  const removeRecipeInstruction = (id) => {
    const values = [...recipeInstructions];
    values.splice(values.findIndex(value => value.id === id), 1);
    values.forEach((value, index) => {
      value.id = index;
      value.order = index + 1;
    });
    setRecipeInstructions(values);
  };

  const handleRecipeInstructionChange = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length
    const id = event.target.id.split('-')[splitIdLen - 1];
    let findIdx = recipeInstructions.findIndex(instruction => instruction.id === parseInt(id));
    const values = [...recipeInstructions];
    values[findIdx].instruction = event.target.value;
    setRecipeInstructions(values);
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
      recipeInstructions: recipeInstructions,
    };
    let result = await axios.post('http://localhost:5051/api/recipes/create', recipeFormInfo)
    console.log(result);

    // Clear form inputs
    setRecipeInfo({ recipeName: "", recipeDescription: "" });
  }

  return (
    <FormCard>
      <form className={classes.form} onSubmit={submitHandler}>
        <RecipeInfoFormSection
          recipeInfo={recipeInfo}
          handleRecipeInfoChange={handleRecipeInfoChange}
        />
        <Divider />
        <Typography variant="h5" sx={{mb: '1rem'}}>Ingredients</Typography>
        <IngredientsFormSection
          ingredients={recipeIngredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          handleIngredientNameChange={handleIngredientNameChange}
        />
        <Divider />
        <Typography variant="h5" sx={{mb: '1rem'}}>Directions</Typography>
        <RecipeInstructionsFormSection
          instructions={recipeInstructions}
          addRecipeInstruction={addRecipeInstruction}
          removeRecipeInstruction={removeRecipeInstruction}
          handleRecipeInstructionChange={handleRecipeInstructionChange}
        />
        <Divider />
        <RecipeNotesFormSection
          recipeInfo={recipeInfo}
          handleRecipeInfoChange={handleRecipeInfoChange}
        />
        <Divider />
        <Button variant="outlined" type="submit">Submit</Button>
      </form>
    </FormCard>
  )

};

export default AddRecipeForm;
