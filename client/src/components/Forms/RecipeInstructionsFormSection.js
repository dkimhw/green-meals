
import React from 'react';
import { styled } from '@mui/system';
import { TextField, Button, IconButton, Alert } from '@mui/material';
import classes from './RecipeInstructionsFormSection.module.css';
import CloseIcon from '@mui/icons-material/Close';

const TextFieldInput = styled(TextField) ({
  marginTop: '.3rem',
  marginBottom: '.3rem',
  width: '300px',
  '@media (max-width: 780px)': {
    width: '100%'
  },
});

const CloseIconButton = styled(IconButton) ({
  position: 'absolute !important',
  right: '-3rem',
  top: '.75rem',
  width: '3rem',
  '@media (max-width: 780px)': {
    right: '-17.5%'
  },
});


const RecipeInstructionsFormSection = (props) => {
  return (
    <div className={classes['ingredients-form-section']}>
      {props.hasRecipeInstructionsError ? <Alert severity="error" sx={{'mb': '.75rem'}}>{props.recipeInstructionsErrorMsg}</Alert> : ''}
      {props.instructions.map((input, idx) => {
        return (
          <div className={classes['ingredients-form-group']} key={input.id}>
            <TextFieldInput
              id={`instruction-${input.id}`}
              name='instruction_text'
              placeholder={input.placeholder}
              label={`Step ${idx + 1}`}
              error={input.hasError || input.serverSideError}
              helperText={
                input.hasError ? input.errorMsg : ''
                ||
                input.serverSideError ? input.serverSideMsgs[0] : ''
              }
              multiline
              maxRows={4}
              value={input.instruction_text || ''}
              onChange={props.handleRecipeInstructionChange}
              onBlur={props.handleRecipeInstructionBlur}
            />
            <CloseIconButton
              id={`remove-instruction-${input.id}`}
              color="primary" onClick={() => props.removeRecipeInstruction(input.id)}
              aria-label="remove ingredient"
              component="label"
            >
              <CloseIcon sx={{fontSize: '1.75rem'}}/>
            </CloseIconButton>
          </div>
        )
      })}

      <Button variant="contained" color="primary" sx={{mb: '1rem'}} onClick={props.addRecipeInstruction}>Add Instruction Step</Button>
    </div>
  )
}

export default RecipeInstructionsFormSection
