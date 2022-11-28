
import React from 'react';
import { TextField, InputLabel } from '@mui/material'
import classes from './RecipeNotesFormSection.module.css'

// Add functionality to add additional notes
const RecipeNotesFormSection = (props) => {
  return (
    <React.Fragment>
      <div className={classes['note-input-group']}>
        <InputLabel id="note-title">Title</InputLabel>
        <TextField
          id="note-title"
          name="noteTitle"
          placeholder="e.g. Cook's Tips"
          variant="standard"
          className={classes['form-notes-input']}
          value={props.recipeInfo.recipeName || "e.g. Cook's Tips"}
          onChange={props.handleRecipeInfoChange}
          />
      </div>
      <div className={classes['note-input-group']}>
        <InputLabel id="recipe-notes">Note</InputLabel>
        <TextField
          id="recipe-notes"
          name="recipeNotes"
          multiline
          variant="standard"
          rows={4}
          className={classes['form-notes-input']}
          placeholder="Write your recipe notes here..."
          InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
          value={props.recipeInfo.recipeNotes || ''}
          onChange={props.handleRecipeInfoChange}
        />
      </div>

    </React.Fragment>
  )
}

export default RecipeNotesFormSection
