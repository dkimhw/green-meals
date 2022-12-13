import React from 'react';
import { useState, useEffect } from 'react';
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

const initialValues = {
  recipeName: "",
  recipeDescription: "",
  prepTime: "",
  prepTimeType: "minutes",
  cookinTime: "",
  cookinTimeType: "minutes",
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
  const [recipeInfo, setRecipeInfo] = useState({initialValues});
  const [recipeIngredients, setRecipeIngredients] = useState(ingredientsInputs);
  const [recipeInstructions, setRecipeInstructions] = useState(recipeInstructionsIntitalValue);
  const [recipeNotes, setRecipeNotes] = useState(recipeNotesInitialValue);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesData, setFilesData] = useState(null);

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

  // Handle file change
  const handleFileInput = async (event) => {
    console.log(...event.target.files);
    let files = event.target.files;

    if (files && files !== undefined) {
      setUploadedFiles([...uploadedFiles, ...files]);
    } else {
      console.log('file error');
    }
  }

  useEffect(() => {
    const newFilesData = [];
    for (let file of uploadedFiles) {
      newFilesData.push(URL.createObjectURL(file));
    }
    setFilesData(newFilesData);
  }, [uploadedFiles])

  const removeFileInput = (idx) => {
    // Remove the image blob url from file data
    const values = [...filesData];
    values.splice(values.findIndex((value, index) => index === idx), 1);
    setFilesData(values);

    // Remove file data from state uploadedFiles
    const images = [...uploadedFiles];
    images.splice(images.findIndex((valude, index)=> index === idx), 1);
    setUploadedFiles(images);
  }

  // Submit Recipe Info //
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('submitted');
    console.log(uploadedFiles);
    console.log(URL.createObjectURL(uploadedFiles[0]))

    // Send to server
    const recipeFormInfo = {
      recipeName: recipeInfo.recipeName,
      recipeDescription: recipeInfo.recipeDescription,
      cookingTime: recipeInfo.cookingTime,
      cookingTimeQty: recipeInfo.cookingTimeQty,
      prepTime: recipeInfo.prepTime,
      prepTimeQty: recipeInfo.prepTimeQty,
      servingSize: recipeInfo.servingSize,
      recipePrivacyStatus: recipeInfo.recipePrivacyStatus,
      recipeIngredients: recipeIngredients,
      recipeInstructions: recipeInstructions,
      recipeNotes: recipeNotes,
      image: uploadedFiles
    };

    const response = await axios({
      method: "post",
      url: "http://localhost:5051/api/recipes/create",
      data: recipeFormInfo,
      headers: { "Content-Type": "multipart/form-data" },
    })
    console.log(response);
    console.log(recipeFormInfo);

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
