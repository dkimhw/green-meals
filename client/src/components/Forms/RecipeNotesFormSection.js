
import React from 'react';
import { TextField, InputLabel, IconButton, Button } from '@mui/material'
import classes from './RecipeNotesFormSection.module.css'
import CloseIcon from '@mui/icons-material/Close';

// Add functionality to add additional notes
const RecipeNotesFormSection = (props) => {
  return (
    <div className={classes['notes-form-section']}>
      {props.recipeNotes.map((note) => {
       return(
        <div key={note.id}>
          <div className={classes['note-input-group']}>
            <InputLabel id={`note-title-${note.id}`} className={classes['note-label']}>Title</InputLabel>
            <TextField
              id={`note-title-${note.id}`}
              name='noteTitle'
              placeholder="e.g. Cook's Tips"
              variant="standard"
              className={`${classes['form-notes-input']} ${classes['note-input']}`}
              value={note.noteTitle || ""}
              onChange={props.handleRecipeNoteChange}
            />
            <IconButton
              id={`remove-note-${note.id}`}
              color="primary"
              onClick={() => props.removeRecipeNote(note.id)}
              aria-label="remove ingredient"
              component="label"
              className={classes['note-remove-btn']}
            >
              <CloseIcon sx={{fontSize: '1.25rem'}}/>
            </IconButton>
          </div>
          <div className={classes['note-input-group']}>
            <InputLabel id={`note-${note.id}`} className={classes['note-label']}>Note</InputLabel>
            <TextField
              id={`note-${note.id}`}
              name='note'
              multiline
              variant="standard"
              rows={4}
              className={`${classes['form-notes-input']} ${classes['note-input']}`}
              placeholder="Write your recipe notes here..."
              InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
              value={note.note || ''}
              onChange={props.handleRecipeNoteChange}
            />
          </div>
        </div>
        )
      })}
      <Button variant="contained" color="primary" sx={{mb: '1rem'}} onClick={props.addRecipeNote}>Add Note</Button>
    </div>
  )
}

export default RecipeNotesFormSection
