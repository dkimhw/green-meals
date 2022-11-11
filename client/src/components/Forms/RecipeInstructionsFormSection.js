
import React from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import classes from './RecipeInstructionsFormSection.module.css';
import CloseIcon from '@mui/icons-material/Close';

const RecipeInstructionsFormSection = (props) => {
  return (
    <React.Fragment>
      {props.instructions.map((input) => {
        return (
          <div className={classes['ingredients-form-group']} key={input.id}>
            <TextField
              id={`instruction-${input.id}`}
              name={`instruction-${input.id}`}
              placeholder={input.placeholder}
              label={`Step ${input.order}`}
              multiline
              maxRows={4}
              value={input.instruction}
              onChange={props.handleRecipeInstructionChange}
            />
            <IconButton id={`remove-instruction-${input.id}`}  color="primary" onClick={() => props.removeRecipeInstruction(input.id)} aria-label="remove ingredient" component="label">
              <CloseIcon sx={{fontSize: '1.75rem'}}/>
            </IconButton>
          </div>
        )
      })}

      <Button variant="contained" color="primary" sx={{mb: '1rem'}} onClick={props.addRecipeInstruction}>Add Instruction Step</Button>
    </React.Fragment>
  )
}

export default RecipeInstructionsFormSection
