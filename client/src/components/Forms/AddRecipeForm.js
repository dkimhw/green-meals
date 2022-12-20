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
import { isValidImagesUploaded } from '../../utils/validateInputs';

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
  { id: 0, ingredient_name: '', placeholder: 'e.g. Flour' },
  { id: 1, ingredient_name: '', placeholder: 'e.g. Sugar' },
  { id: 2, ingredient_name: '', placeholder: 'e.g. Olive oil' },
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
  const [recipeIngredients, setRecipeIngredients] = useState(ingredientsInputs);
  const [recipeInstructions, setRecipeInstructions] = useState(recipeInstructionsIntitalValue);
  const [recipeNotes, setRecipeNotes] = useState(recipeNotesInitialValue);
  const { handleFileInput, removeFileInput, filesData, uploadedFiles, fileErrors } = useFormImagesUpload(isValidImagesUploaded);


  // Recipe Info changes
  const handleRecipeInfoChange = async (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
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

  // Recipe notes handlers
  const addRecipeNote = () => {
    let maxId = Math.max(...recipeNotes.map(instruction => instruction.id));
    maxId < 0 ? maxId = 0 : maxId = maxId + 1;
    setRecipeNotes([...recipeNotes, { id: maxId, noteTitle: '', notes: '' }]);
  };

  const removeRecipeNote = (id) => {
    const values = [...recipeNotes];
    values.splice(values.findIndex(value => value.id === id), 1);
    values.forEach((value, index) => {
      value.id = index;
    });
    setRecipeNotes(values);
  };

  const handleRecipeNoteTitleChange = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length
    const id = event.target.id.split('-')[splitIdLen - 1];
    let findIdx = recipeNotes.findIndex(note => note.id === parseInt(id));
    const values = [...recipeNotes];
    values[findIdx].noteTitle = event.target.value;
    setRecipeNotes(values);
  };

  const handleRecipeNoteChange = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length
    const id = event.target.id.split('-')[splitIdLen - 1];
    let findIdx = recipeNotes.findIndex(note => note.id === parseInt(id));
    const values = [...recipeNotes];
    values[findIdx].note = event.target.value;
    setRecipeNotes(values);
  };

  // Submit Recipe Info //
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('submitted');

    // // Send to server
    // const recipeFormInfo = {
    //   recipeName: recipeInfo.recipeName,
    //   recipeDescription: recipeInfo.recipeDescription,
    //   cookingTime: recipeInfo.cookingTime,
    //   cookingTimeQty: recipeInfo.cookingTimeQty,
    //   prepTime: recipeInfo.prepTime,
    //   prepTimeQty: recipeInfo.prepTimeQty,
    //   servingSize: recipeInfo.servingSize,
    //   recipePrivacyStatus: recipeInfo.recipePrivacyStatus,
    //   recipeIngredients: recipeIngredients,
    //   recipeInstructions: recipeInstructions,
    //   recipeNotes: recipeNotes,
    //   images: uploadedFiles,
    // };
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
    setRecipeInfo({ recipeName: "", recipeDescription: "" });
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
          handleRecipeNoteTitleChange={handleRecipeNoteTitleChange}
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
