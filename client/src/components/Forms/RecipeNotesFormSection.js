
import React from 'react';
import { styled } from '@mui/system';
import { TextField, InputLabel, IconButton, Button, Alert } from '@mui/material'
import classes from './RecipeNotesFormSection.module.css'
import CloseIcon from '@mui/icons-material/Close';

const TextFieldInput = styled(TextField) ({
  marginTop: '1rem',
  marginBottom: '1rem',
  width: '375px',
  '@media (max-width: 780px)': {
    width: '100%'
  },
});

const CloseIconButton = styled(IconButton) ({
  position: 'absolute !important',
  right: '-12.5%',
  top: '3rem',
  width: '3rem',
  '@media (max-width: 780px)': {
    right: '-17.5%'
  },
});


// Add functionality to add additional notes
const RecipeNotesFormSection = (props) => {
  // Combine the two arrays
  let recipeNotes = [];
  for (let idx = 0; idx < props.recipeNoteTitles.length; idx += 1) {
    recipeNotes.push([props.recipeNoteTitles[idx], props.recipeNoteMessages[idx]])
  };

  return (
    <div className={classes['notes-form-section']}>
      {props.hasRecipeNoteTitlesError ? <Alert severity="error" sx={{'mb': '.75rem'}}>{props.hasRecipeNoteTitlesError}</Alert> : ''}
      {recipeNotes ? recipeNotes.map((note) => {
       let titleServerSideError = note[0]?.serverSideError;
       return(
        <div key={note[0].id}>
          <div className={classes['note-input-group']}>
            <InputLabel id={`note-title-${note[0].id}`}>Title</InputLabel>
            <TextFieldInput
              id={`note-title-${note[0].id}`}
              name='title'
              placeholder="e.g. Cook's Tips"
              error={note[0].hasError || titleServerSideError}
              helperText={
                note[0].hasError ? note[0].errorMsg : ''
                ||
                note[0].serverSideError ? note[0].serverSideMsgs[0] : ''
              }
              value={note[0].title || ""}
              onChange={props.handleRecipeNoteTitlesChange}
              onBlur={props.handleRecipeNoteTitlesBlur}
            />
            <CloseIconButton
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
            </CloseIconButton>
          </div>
          <div className={classes['note-input-group']}>
            <InputLabel id={`note-${note[1].id}`}>Note</InputLabel>
            <TextField
              id={`note-${note[1].id}`}
              name='note'
              multiline
              variant="outlined"
              rows={4}
              className={`${classes['form-notes-input']}`}
              placeholder="Write your recipe notes here..."
              InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
              error={note[1].hasError || note[1].serverSideError}
              helperText={
                note[1].hasError ? note[1].errorMsg : ''
                ||
                note[1].serverSideError ? note[1].serverSideMsgs[0] : ''
              }
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
        sx={{mt: '.25rem', mb: '1rem', width: '7.5rem', alignSelf: 'center'}}
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
