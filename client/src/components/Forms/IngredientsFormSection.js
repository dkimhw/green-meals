
import React from 'react';
import { styled } from '@mui/system';
import { TextField, Button, IconButton, Alert } from '@mui/material';
import classes from './IngredientsFormSection.module.css';
import CloseIcon from '@mui/icons-material/Close';
import FormInputAlert from '../UI/FormInputAlert';

const TextFieldInput = styled(TextField) ({
  marginTop: '.3rem',
  marginBottom: '.3rem',
  width: '300px',
  '@media (max-width: 780px)': {
    width: '250px'
  },
});

const CloseIconButton = styled(IconButton) ({
  position: 'absolute !important',
  right: '-17.5%',
  top: '12.5%',
  width: '3rem',
  '@media (max-width: 780px)': {
    right: '-20.5%'
  },
});

const AddIngredientsFormSection = (props) => {
  console.log("ingredients form re-rendered", props);

  return (
    <React.Fragment>
      {props.hasRecipeIngredientsError ? <Alert severity="error" sx={{'mb': '.75rem'}}>{props.recipeIngredientsErrorMsg}</Alert> : ''}
      {props.ingredients ? props.ingredients.map((input) => {
        return (
          <React.Fragment key={input.id}>
            <div className={classes['ingredients-form-group']} >
              <TextFieldInput
                id={`recipe-name-${input.id}`}
                name='ingredient_name'
                placeholder={input.placeholder}
                error={input.hasError || input.serverSideError}
                helperText={
                  input.hasError ? input.errorMsg : ''
                  ||
                  input.serverSideError ? input.serverSideMsgs[0] : ''
                }
                onChange={props.handleIngredientNameChange}
                onBlur={props.handleIngredientBlur}
                variant="outlined"
                value={input.ingredient_name || ''}
                label="Ingredient Name"
              />

              <CloseIconButton
                id={`remove-recipe-name-${input.id}`}
                color="primary"
                onClick={() => props.removeIngredient(input.id)}
                aria-label="remove ingredient"
                component="label"
              >
                <CloseIcon sx={{fontSize: '1.75rem'}}/>
              </CloseIconButton>
            </div>
            {input.hasError ? <FormInputAlert msg={input.error} css={classes['ingredients-form-group-error']}/> : '' }
          </React.Fragment>
        )
      }) : ''}

      <Button variant="contained" color="primary" sx={{mb: '1rem', display: 'flex', justifyContent: 'center'}} onClick={props.addIngredient}>Add Ingredient</Button>
    </React.Fragment>
  )
}

export default AddIngredientsFormSection
