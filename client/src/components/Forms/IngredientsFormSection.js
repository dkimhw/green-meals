
import React from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import classes from './IngredientsFormSection.module.css';
import CloseIcon from '@mui/icons-material/Close';
import FormInputAlert from '../UI/FormInputAlert';


const AddIngredientsFormSection = (props) => {
  return (
    <React.Fragment>
      {props.ingredients ? props.ingredients.map((input) => {
        return (
          <React.Fragment key={input.id}>
            <div className={classes['ingredients-form-group']} >
              <TextField
                id={`recipe-name-${input.id}`}
                name='ingredientName'
                placeholder={input.placeholder}
                defaultValue=""
                error={input.hasError}
                helperText={input.hasError ? input.errorMsg : '' }
                onChange={props.handleIngredientNameChange}
                onBlur={props.handleIngredientBlur}
                variant="outlined"
                values={input.ingredient_name}
                label="Ingredient Name"
              />

              <IconButton id={`remove-recipe-name-${input.id}`}  color="primary" onClick={() => props.removeIngredient(input.id)} aria-label="remove ingredient" component="label">
                <CloseIcon sx={{fontSize: '1.75rem'}}/>
              </IconButton>
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
