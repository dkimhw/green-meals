
import React from 'react';
import { TextField, Button, IconButton, Alert } from '@mui/material';
import classes from './RecipeInstructionsFormSection.module.css';
import CloseIcon from '@mui/icons-material/Close';

const RecipeInstructionsFormSection = (props) => {
  return (
    <div className={classes['ingredients-form-section']}>
      {props.hasRecipeInstructionsError ? <Alert severity="error" sx={{'mb': '.75rem'}}>{props.recipeInstructionsErrorMsg}</Alert> : ''}
      {props.instructions.map((input, idx) => {
        return (
          <div className={classes['ingredients-form-group']} key={input.id}>
            <TextField
              id={`instruction-${input.id}`}
              name='instruction'
              placeholder={input.placeholder}
              label={`Step ${idx + 1}`}
              error={input.hasError}
              helperText={input.hasError ? input.errorMsg : '' }
              multiline
              maxRows={4}
              value={input.instruction}
              onChange={props.handleRecipeInstructionChange}
              onBlur={props.handleRecipeInstructionBlur}
            />
            <IconButton
              id={`remove-instruction-${input.id}`}
              color="primary" onClick={() => props.removeRecipeInstruction(input.id)}
              aria-label="remove ingredient"
              component="label"
              className={classes['close-btn']}
            >
              <CloseIcon sx={{fontSize: '1.75rem'}}/>
            </IconButton>
          </div>
        )
      })}

      <Button variant="contained" color="primary" sx={{mb: '1rem'}} onClick={props.addRecipeInstruction}>Add Instruction Step</Button>
    </div>
  )
}

export default RecipeInstructionsFormSection
