import React from 'react';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import classes from './AddRecipeForm.module.css';
import IngredientsFormSection from './IngredientsFormSection';
import RecipeInstructionsFormSection from './RecipeInstructionsFormSection';
import RecipeInfoFormSection from './RecipeInfoFormSection';
import RecipeTimeFormSection from './RecipeTimeFormSection';
import RecipeNotesFormSection from './RecipeNotesFormSection';
import RecipePublicPrivateFormSection from './RecipePublicPrivateFormSection';
import FormCard from '../UI/FormCard';
import Divider from '../UI/Divider';
import axios from 'axios';
import useFormImagesUpload from '../../hooks/useFormImagesUpload';
import useMultipleInputs from '../../hooks/useMultipleInputs';
import { isValidImagesUploaded, isValidStringInput } from '../../utils/validateInputs';

const initialValues = {
  recipeName: "",
  recipeDescription: "",
  prepTime: "",
  prepTimeType: "minutes",
  cookingTime: "",
  cookingTimeType: "minutes",
  servingSize: "",
  recipePrivacyStatus: "public",
}

const ingredientsInputs = [
  { id: 0, ingredientName: '', placeholder: 'e.g. Flour', hasError: false, error: '', touched: false },
  { id: 1, ingredientName: '', placeholder: 'e.g. Sugar', hasError: false, error: '', touched: false },
  { id: 2, ingredientName: '', placeholder: 'e.g. Olive oil', hasError: false, error: '', touched: false },
]

const recipeInstructionsIntitalValue = [
  { id: 0, order: 1, instruction: '', placeholder: 'e.g. Preheat oven to 350 degrees F.' },
  { id: 1, order: 2, instruction: '', placeholder: 'Add another instruction' },
  { id: 2, order: 3, instruction: '', placeholder: 'Add another instruction' },
]

const recipeNotesInitialValue = [
  { id: 0, noteTitle: '', note: '' },
]

// https://github.com/bradtraversy/react_step_form/tree/master/src/components
// Breaking apart long forms into components

// Multiple Files: https://www.techgeeknext.com/react/multiple-files-upload-example
// https://www.positronx.io/react-multiple-files-upload-with-node-express-tutorial/
const AddRecipeForm = () => {
  const [recipeInfo, setRecipeInfo] = useState(initialValues);
  const {
    inputArray: recipeIngredients
    , addInput: addIngredient
    , removeInput: removeIngredient
    , handleChange: handleIngredientNameChange
    , onBlur: handleIngredientBlur
  } = useMultipleInputs(ingredientsInputs, { id: 0, ingredient_name: '', placeholder: 'Add a new ingredient', hasError: false, error: '', touched: false }, isValidStringInput);
  const {
    inputArray: recipeInstructions
    , addInput: addRecipeInstruction
    , removeInput: removeRecipeInstruction
    , handleChange: handleRecipeInstructionChange
  } = useMultipleInputs(recipeInstructionsIntitalValue, { id: 0, instruction: '', placeholder: 'Add another instruction' });
  const {
    inputArray: recipeNotes
    , addInput: addRecipeNote
    , removeInput: removeRecipeNote
    , handleChange: handleRecipeNoteChange
  } = useMultipleInputs(recipeNotesInitialValue, { id: 0, noteTitle: '', note: '' });
  const { handleFileInput, removeFileInput, filesData, uploadedFiles, fileErrors } = useFormImagesUpload(isValidImagesUploaded);

  // Recipe Info changes
  const handleRecipeInfoChange = async (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setRecipeInfo({ ...recipeInfo, [event.target.name]: event.target.value });
  }

  // Submit Recipe Info //
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('submitted');
    console.log("recipeInfo ", recipeInfo)
    console.log("cookingTime", recipeInfo.cookingTimeType)
    console.log("prepTimeType", recipeInfo.prepTimeType)

    const recipeFormInfo = new FormData();
    recipeFormInfo.append('recipeName', recipeInfo.recipeName);
    recipeFormInfo.append('recipeDescription', recipeInfo.recipeDescription);
    recipeFormInfo.append('cookingTime', recipeInfo.cookingTime);
    recipeFormInfo.append('cookingTimeQty', recipeInfo.cookingTimeType);
    recipeFormInfo.append('prepTime', recipeInfo.prepTime);
    recipeFormInfo.append('prepTimeQty', recipeInfo.prepTimeType);
    recipeFormInfo.append('servingSize', recipeInfo.servingSize);
    recipeFormInfo.append('recipePrivacyStatus', recipeInfo.recipePrivacyStatus);
    recipeFormInfo.append('recipeIngredients', JSON.stringify(recipeIngredients));
    recipeFormInfo.append('recipeInstructions',  JSON.stringify(recipeInstructions));
    recipeFormInfo.append('recipeNotes',  JSON.stringify(recipeNotes));

    uploadedFiles.forEach(image => {
      recipeFormInfo.append('images', image);
    });

    const response = await axios({
      method: "post",
      url: "http://localhost:5051/api/recipes/create",
      data: recipeFormInfo,
      headers: { "Content-Type": "multipart/form-data" },
    })
    console.log(response);

    // Clear form inputs - need to add more
    setRecipeInfo(initialValues);
  }


  return (
    <FormCard>
      <form className={classes.form} onSubmit={submitHandler} method="post">
        <RecipeInfoFormSection
          recipeInfo={recipeInfo}
          handleRecipeInfoChange={handleRecipeInfoChange}
          handleFileInput={handleFileInput}
          removeFileInput={removeFileInput}
          filesData={filesData}
          fileErrors={fileErrors}
        />
        <Divider />
        <Typography variant="h5" sx={{mb: '1rem'}}>Ingredients</Typography>
        <IngredientsFormSection
          ingredients={recipeIngredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          handleIngredientNameChange={handleIngredientNameChange}
          handleIngredientBlur={handleIngredientBlur}
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
        <Typography variant="h5" sx={{mb: '1rem'}}>Cooking Time</Typography>
        <RecipeTimeFormSection
          recipeInfo={recipeInfo}
          handleRecipeInfoChange={handleRecipeInfoChange}
        />
        <Divider />
        <RecipeNotesFormSection
          recipeNotes={recipeNotes}
          addRecipeNote={addRecipeNote}
          removeRecipeNote={removeRecipeNote}
          handleRecipeNoteChange={handleRecipeNoteChange}
        />
        <Divider />
        <RecipePublicPrivateFormSection
          recipeInfo={recipeInfo}
          handleRecipeInfoChange={handleRecipeInfoChange}
        />
        <Button variant="outlined" type="submit" sx={{mt: '1.5rem'}}>Submit</Button>
      </form>
    </FormCard>
  )

};

export default AddRecipeForm;
