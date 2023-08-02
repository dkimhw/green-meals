
import React from 'react';
import { Button, Alert } from '@mui/material';
import classes from './IngredientsFormSection.module.css';
import FormInputAlert from '../UI/FormInputAlert';
import { TextInputWithCloseIcon } from '../UI/textInputWithCloseIcon';

export const TestIngredientsSection = (props) => {
  return (
    <React.Fragment>
      {props.hasRecipeIngredientsError ? <Alert severity="error" sx={{'mb': '.75rem'}}>{props.recipeIngredientsErrorMsg}</Alert> : ''}
      {props.ingredients ? props.ingredients.map((input) => {
        return (
          <React.Fragment key={input.id}>
            <TextInputWithCloseIcon
              /* Text Field props */
              textFieldIdName={`recipe-name-${input.id}`}
              name='ingredient_name'
              id={input.id}
              placeholder={input.placeholder}
              hasError={input.hasError}
              serverSideError={input.serverSideError}
              errorMsg={input.errorMsg}
              serverSideMsgs={input.serverSideMsgs}
              onChange={props.handleIngredientNameChange}
              onBlur={props.handleIngredientBlur}
              label="Ingredient Name"
              value={input.ingredient_name}

              /* Close icon props */
              iconButtonIdName={`remove-recipe-name-${input.id}`}
              iconOnClick={props.removeIngredient}
              iconButtonAriaLabel="remove ingredient"
              iconButtonComponent="label"
            />
            {input.hasError ? <FormInputAlert msg={input.error} css={classes['ingredients-form-group-error']}/> : '' }
          </React.Fragment>
        )
      }) : ''}

      <Button variant="contained" color="primary" sx={{mb: '1rem', display: 'flex', justifyContent: 'center'}} onClick={props.addIngredient}>Add Ingredient</Button>
    </React.Fragment>
  )
}
