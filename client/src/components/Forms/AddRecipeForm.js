import React from 'react';
import { Button, Typography } from '@mui/material';
import FormCard from '../UI/FormCard';
import classes from './AddRecipeForm.module.css';
import IngredientsFormSection from './IngredientsFormSection';
import RecipeInstructionsFormSection from './RecipeInstructionsFormSection';
import RecipeInfoFormSection from './RecipeInfoFormSection';
import RecipeTimeFormSection from './RecipeTimeFormSection';
import RecipeNotesFormSection from './RecipeNotesFormSection';
import RecipePublicPrivateFormSection from './RecipePublicPrivateFormSection';
import Divider from '../UI/Divider';
import axios from 'axios';
import useFormImagesUpload from '../../hooks/useFormImagesUpload';
import useMultipleInputs from '../../hooks/useMultipleInputs';
import useFormInput from '../../hooks/useFormInput';
import SectionTitle from '../UI/SectionTitle';
import { isValidImagesUploaded, validateTextInput, validateNumber, validateTimeType, validatePrivacyStatus } from '../../utils/validateInputs';

const ingredientsInputs = [
  { id: 0, ingredientName: '', placeholder: 'e.g. Flour', hasError: false, errorMsg: '', touched: false },
  { id: 1, ingredientName: '', placeholder: 'e.g. Sugar', hasError: false, errorMsg: '', touched: false },
  { id: 2, ingredientName: '', placeholder: 'e.g. Olive oil', hasError: false, errorMsg: '', touched: false },
]

const recipeInstructionsIntitalValue = [
  { id: 0, order: 1, instruction: '', placeholder: 'e.g. Preheat oven to 350 degrees F.' },
  { id: 1, order: 2, instruction: '', placeholder: 'Add another instruction' },
  { id: 2, order: 3, instruction: '', placeholder: 'Add another instruction' },
]

const recipeNoteTitlesInitialValue = [
  { id: 0, noteTitle: '' },
];

const recipeNoteMessagesInitialValue = [
  { id: 0, note: '' },
];

// https://github.com/bradtraversy/react_step_form/tree/master/src/components
// Breaking apart long forms into components

// Multiple Files: https://www.techgeeknext.com/react/multiple-files-upload-example
// https://www.positronx.io/react-multiple-files-upload-with-node-express-tutorial/
const AddRecipeForm = () => {
  // Input custom hooks
  const {
    value: recipeName
    , isValid: isRecipenameInputValid
    , hasError: hasRecipeNameInputError
    , errMsg: recipeNameErrorMsg
    , blurInputHandler: recipeNameBlurInputHandler
    , valueChangeHandler: recipeNameChangeHandler
    , resetInput: recipeNameReset
  } = useFormInput(validateTextInput);

  const {
    value: recipeDescription
    , isValid: isRecipeDescriptionValid
    , hasError: hasRecipeDescriptionInputError
    , errMsg: recipeDescriptionErrorMsg
    , blurInputHandler: recipeDescriptionBlurInputHandler
    , valueChangeHandler: recipeDescriptionChangeHandler
    , resetInput: recipeDescriptionReset
  } = useFormInput(validateTextInput);

  const {
    value: servingSize
    , isValid: isServingSizeValid
    , hasError: hasServingSizeInputError
    , errMsg: servingSizeErrorMsg
    , blurInputHandler: servingSizeBlurInputHandler
    , valueChangeHandler: servingSizeChangeHandler
    , resetInput: servingSizeReset
  } = useFormInput(validateNumber);

  const {
    value: prepTime
    , isValid: isPrepTimeValid
    , hasError: hasPrepTimeInputError
    , errMsg: prepTimeErrorMsg
    , blurInputHandler: prepTimeBlurInputHandler
    , valueChangeHandler: prepTimeChangeHandler
    , resetInput: prepTimeReset
  } = useFormInput(validateNumber);

  const {
    value: prepTimeType
    , isValid: isPrepTimeTypeValid
    , hasError: hasPrepTimeTypeInputError
    , errMsg: prepTimeTypeErrorMsg
    , blurInputHandler: prepTimeTypeBlurInputHandler
    , valueChangeHandler: prepTimeTypeChangeHandler
    , resetInput: prepTimeTypeReset
  } = useFormInput(validateTimeType, 'minutes');

  const {
    value: cookingTime
    , isValid: isCookingTimeValid
    , hasError: hasCookingTimeInputError
    , errMsg: cookingTimeErrorMsg
    , blurInputHandler: cookingTimeBlurInputHandler
    , valueChangeHandler: cookingTimeChangeHandler
    , resetInput: cookingTimeReset
  } = useFormInput(validateNumber);

  const {
    value: cookingTimeType
    , isValid: isCookingTimeTypeValid
    , hasError: hasCookingTimeTypeInputError
    , errMsg: cookingTimeTypeErrorMsg
    , blurInputHandler: cookingTimeTypeBlurInputHandler
    , valueChangeHandler: cookingTimeTypeChangeHandler
    , resetInput: cookingTimeTypeReset
  } = useFormInput(validateTimeType, 'minutes');

  const {
    value: recipePrivacyStatus
    , isValid: isRecipePrivacyStatusValid
    , hasError: hasRecipePrivacyStatusInputError
    , errMsg: recipePrivacyStatusErrorMsg
    , blurInputHandler: recipePrivacyStatusBlurInputHandler
    , valueChangeHandler: recipePrivacyStatusChangeHandler
    , resetInput: recipePrivacyStatusReset
  } = useFormInput(validatePrivacyStatus, 'public');

  // Grouped multipe inputs
  const {
    inputArray: recipeIngredients
    , addInput: addIngredient
    , removeInput: removeIngredient
    , handleChange: handleIngredientNameChange
    , onBlur: handleIngredientBlur
    , onSubmitValidate: recipeIngredientsOnSubmit
  } = useMultipleInputs(ingredientsInputs, { id: 0, ingredientName: '', placeholder: 'Add a new ingredient', hasError: false, error: '' }, validateTextInput);

  const {
    inputArray: recipeInstructions
    , addInput: addRecipeInstruction
    , removeInput: removeRecipeInstruction
    , handleChange: handleRecipeInstructionChange
    , onBlur: handleRecipeInstructionBlur
    , onSubmitValidate: recipeInstructionsOnSubmit
  } = useMultipleInputs(recipeInstructionsIntitalValue, { id: 0, instruction: '', placeholder: 'Add another instruction' }, validateTextInput);

  const {
    inputArray: recipeNoteTitles
    , addInput: addRecipeNoteTitles
    , removeInput: removeRecipeNoteTitles
    , handleChange: handleRecipeNoteTitlesChange
    , onBlur: handleRecipeNoteTitlesBlur
    , onSubmitValidate: recipeNoteTitlesOnSubmit
  } = useMultipleInputs(recipeNoteTitlesInitialValue, { id: 0, noteTitle: ''}, validateTextInput);

  const {
    inputArray: recipeNoteMessages
    , addInput: addRecipeNoteMessages
    , removeInput: removeRecipeNoteMessages
    , handleChange: handleRecipeNoteMessagesChange
    , onBlur: handleRecipeNoteMessagesBlur
    , onSubmitValidate: recipeNoteMessagesOnSubmit
  } = useMultipleInputs(recipeNoteMessagesInitialValue, { id: 0, note: '' }, validateTextInput);

  const {
    handleFileInput,
    removeFileInput,
    filesData,
    uploadedFiles,
    fileErrors
  } = useFormImagesUpload(isValidImagesUploaded);

  // Submit Recipe Info //
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('submitted');

    // Once the submit button has been clicked we need to make sure the input fields have been marked as touched
    recipeNameBlurInputHandler();
    recipeDescriptionBlurInputHandler();
    servingSizeBlurInputHandler();
    prepTimeBlurInputHandler();
    prepTimeTypeBlurInputHandler();
    cookingTimeBlurInputHandler();
    cookingTimeTypeBlurInputHandler();
    recipePrivacyStatusBlurInputHandler();
    recipeNoteTitlesOnSubmit('noteTitle');
    recipeNoteMessagesOnSubmit('note');
    recipeIngredientsOnSubmit('ingredientName');
    recipeInstructionsOnSubmit('instruction');

    if (isRecipeDescriptionValid && isRecipenameInputValid && isServingSizeValid
        && isPrepTimeValid && isCookingTimeValid && isPrepTimeTypeValid
        && isCookingTimeTypeValid && isRecipePrivacyStatusValid) {
      const recipeFormInfo = new FormData();
      recipeFormInfo.append('recipeName', recipeName);
      recipeFormInfo.append('recipeDescription', recipeDescription);
      recipeFormInfo.append('cookingTime', cookingTime);
      recipeFormInfo.append('cookingTimeQty', cookingTimeType);
      recipeFormInfo.append('prepTime', prepTime);
      recipeFormInfo.append('prepTimeQty', prepTimeType);
      recipeFormInfo.append('servingSize', servingSize);
      recipeFormInfo.append('recipePrivacyStatus', recipePrivacyStatus);
      recipeFormInfo.append('recipeIngredients', JSON.stringify(recipeIngredients));
      recipeFormInfo.append('recipeInstructions',  JSON.stringify(recipeInstructions));
      recipeFormInfo.append('recipeNoteMessages',  JSON.stringify(recipeNoteMessages));
      recipeFormInfo.append('recipeNoteTitles',  JSON.stringify(recipeNoteTitles));

      uploadedFiles.forEach(image => {
        recipeFormInfo.append('images', image);
      });

      const response = await axios({
        method: "post",
        url: "http://localhost:5051/api/recipes/create",
        data: recipeFormInfo,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

      // Clear form inputs
      recipeNameReset();
      recipeDescriptionReset();
      servingSizeReset();
      prepTimeReset();
      prepTimeTypeReset();
      cookingTimeReset();
      cookingTimeTypeReset();
      recipePrivacyStatusReset();

    }
  };
  return (
    <FormCard>
      <SectionTitle>Add a Recipe</SectionTitle>
      <form className={classes.form} onSubmit={submitHandler} method="post">
        <RecipeInfoFormSection
          // Recipe Name
          recipeName={recipeName}
          hasRecipeNameInputError={hasRecipeNameInputError}
          recipeNameErrorMsg={recipeNameErrorMsg}
          isRecipenameInputValid={isRecipenameInputValid}
          recipeNameBlurInputHandler={recipeNameBlurInputHandler}
          recipeNameChangeHandler={recipeNameChangeHandler}

          // Recipe Description
          recipeDescription={recipeDescription}
          hasRecipeDescriptionInputError={hasRecipeDescriptionInputError}
          recipeDescriptionErrorMsg={recipeDescriptionErrorMsg}
          recipeDescriptionBlurInputHandler={recipeDescriptionBlurInputHandler}
          recipeDescriptionChangeHandler={recipeDescriptionChangeHandler}

          // Serving Size
          servingSize={servingSize}
          hasServingSizeInputError={hasServingSizeInputError}
          servingSizeErrorMsg={servingSizeErrorMsg}
          servingSizeBlurInputHandler={servingSizeBlurInputHandler}
          servingSizeChangeHandler={servingSizeChangeHandler}

          // File Inputs
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
          handleRecipeInstructionBlur={handleRecipeInstructionBlur}
        />
        <Divider />
        <Typography variant="h5" sx={{mb: '1rem'}}>Cooking Time</Typography>
        <RecipeTimeFormSection
          // Prep Time
          prepTime={prepTime}
          hasPrepTimeInputError={hasPrepTimeInputError}
          prepTimeErrorMsg={prepTimeErrorMsg}
          prepTimeBlurInputHandler={prepTimeBlurInputHandler}
          prepTimeChangeHandler={prepTimeChangeHandler}

          // Prep Time Type
          prepTimeType={prepTimeType}
          hasPrepTimeTypeInputError={hasPrepTimeTypeInputError}
          prepTimeTypeErrorMsg={prepTimeTypeErrorMsg}
          prepTimeTypeBlurInputHandler={prepTimeTypeBlurInputHandler}
          prepTimeTypeChangeHandler={prepTimeTypeChangeHandler}

          // Cooking Time
          cookingTime={cookingTime}
          hasCookingTimeInputError={hasCookingTimeInputError}
          cookingTimeErrorMsg={cookingTimeErrorMsg}
          cookingTimeBlurInputHandler={cookingTimeBlurInputHandler}
          cookingTimeChangeHandler={cookingTimeChangeHandler}

          // Cooking Time Type
          cookingTimeType={cookingTimeType}
          hasCookingTimeTypeInputError={hasCookingTimeTypeInputError}
          cookingTimeTypeErrorMsg={cookingTimeTypeErrorMsg}
          cookingTimeTypeChangeHandler={cookingTimeTypeChangeHandler}
          cookingTimeTypeBlurInputHandler={cookingTimeTypeBlurInputHandler}
        />
        <Divider />
        <RecipeNotesFormSection
          // Title
          recipeNoteTitles={recipeNoteTitles}
          addRecipeNoteTitles={addRecipeNoteTitles}
          removeRecipeNoteTitles={removeRecipeNoteTitles}
          handleRecipeNoteTitlesChange={handleRecipeNoteTitlesChange}
          handleRecipeNoteTitlesBlur={handleRecipeNoteTitlesBlur}

          // Note
          recipeNoteMessages={recipeNoteMessages}
          addRecipeNoteMessages={addRecipeNoteMessages}
          removeRecipeNoteMessages={removeRecipeNoteMessages}
          handleRecipeNoteMessagesChange={handleRecipeNoteMessagesChange}
          handleRecipeNoteMessagesBlur={handleRecipeNoteMessagesBlur}
        />
        <Divider />
        <RecipePublicPrivateFormSection
          recipePrivacyStatus={recipePrivacyStatus}
          hasRecipePrivacyStatusInputError={hasRecipePrivacyStatusInputError}
          recipePrivacyStatusErrorMsg={recipePrivacyStatusErrorMsg}
          recipePrivacyStatusChangeHandler={recipePrivacyStatusChangeHandler}
          recipePrivacyStatusBlurInputHandler={recipePrivacyStatusBlurInputHandler}
        />
        <Button variant="outlined" type="submit" sx={{mt: '1.5rem'}}>Submit</Button>
      </form>
    </FormCard>
  )

};

export default AddRecipeForm;
