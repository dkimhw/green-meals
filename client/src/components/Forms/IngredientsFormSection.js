
import React from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import classes from './IngredientsFormSection.module.css';
import CloseIcon from '@mui/icons-material/Close';

const AddIngredientsFormSection = (props) => {
  return (
    <React.Fragment>
      {props.ingredients.map((input) => {
        return (
          <div className={classes['ingredients-form-group']} key={input.id}>
            <TextField
              id={`recipe-name-${input.id}`}
              name={`recipe-name-${input.id}`}
              placeholder={input.placeholder}
              defaultValue=""
              onChange={props.handleIngredientNameChange}
              variant="outlined"
              values={input.ingredient_name}
              label="Ingredient Name"
            />
            <IconButton id={`remove-recipe-name-${input.id}`}  color="primary" onClick={() => props.removeIngredient(input.id)} aria-label="remove ingredient" component="label">
              <CloseIcon sx={{fontSize: '1.75rem'}}/>
            </IconButton>
          </div>
        )
      })}

      <Button variant="contained" color="primary" sx={{mb: '1rem', display: 'flex', justifyContent: 'center'}} onClick={props.addIngredient}>Add Ingredient</Button>
    </React.Fragment>
  )
}

export default AddIngredientsFormSection
