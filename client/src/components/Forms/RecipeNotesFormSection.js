
import React from 'react';
import { TextField, InputLabel, IconButton, Button } from '@mui/material'
import classes from './RecipeNotesFormSection.module.css'
import CloseIcon from '@mui/icons-material/Close';

// Add functionality to add additional notes
const RecipeNotesFormSection = (props) => {
  // Combine the two arrays
  let recipeNotes = [];
  for (let idx = 0; idx < props.recipeNoteTitles.length; idx += 1) {
    recipeNotes.push([props.recipeNoteTitles[idx], props.recipeNoteMessages[idx]])
  };

  console.log(recipeNotes);

  // const removeRecipeNote = (id) => {
  //   props.removeRecipeNoteMessages(id);
  //   props.handleRecipeNoteTitlesChange(id);
  // }

  return (
    <div className={classes['notes-form-section']}>
      {recipeNotes ? recipeNotes.map((note) => {
       return(
        <div key={note[0].id}>
          <div className={classes['note-input-group']}>
            <InputLabel id={`note-title-${note[0].id}`} className={classes['note-label']}>Title</InputLabel>
            <TextField
              id={`note-title-${note[0].id}`}
              name='noteTitle'
              placeholder="e.g. Cook's Tips"
              variant="standard"
              className={`${classes['form-notes-input']} ${classes['note-input']}`}
              value={note[0].noteTitle || ""}
              error={note[0].hasError}
              helperText={note[0].hasError ? note[0].errorMsg : '' }
              onChange={props.handleRecipeNoteTitlesChange}
              onBlur={props.handleRecipeNoteTitlesBlur}
            />
            <IconButton
              id={`remove-note-${note[0].id}`}
              color="primary"
              onClick={() => {
                props.removeRecipeNoteTitles(note[0].id);
                props.removeRecipeNoteMessages(note[0].id);
              }}
              aria-label="remove ingredient"
              component="label"
              className={classes['note-remove-btn']}
            >
              <CloseIcon sx={{fontSize: '1.25rem'}}/>
            </IconButton>
          </div>
          <div className={classes['note-input-group']}>
            <InputLabel id={`note-${note[1].id}`} className={classes['note-label']}>Note</InputLabel>
            <TextField
              id={`note-${note[1].id}`}
              name='note'
              multiline
              variant="standard"
              rows={4}
              className={`${classes['form-notes-input']} ${classes['note-input']}`}
              placeholder="Write your recipe notes here..."
              InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
              error={note[1].hasError}
              helperText={note[1].hasError ? note[1].errorMsg : '' }
              value={note[1].note || ''}
              onChange={props.handleRecipeNoteMessagesChange}
              onBlur={props.handleRecipeNoteMessagesBlur}
            />
          </div>
        </div>
        )
      }) : '' }
      <Button
        variant="contained"
        color="primary"
        sx={{mb: '1rem'}}
        onClick={() => {
          props.addRecipeNoteTitles();
          props.addRecipeNoteMessages();
        }}>
        Add Note
      </Button>
    </div>
  )
}

export default RecipeNotesFormSection
