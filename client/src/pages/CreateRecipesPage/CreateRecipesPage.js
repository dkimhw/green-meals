
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import classes from './CreateRecipesPage.module.css';

const CreateRecipes = () => {
  return (
    <React.Fragment>
      <Typography variant="h3" className={classes['create-recipes-title']} align="center">Create a Recipe</Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          'display': 'flex',
          'justify-content': 'center'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Recipe Name" variant="outlined"/>
        <TextField id="outlined-basic" label="Description" variant="outlined"/>
      </Box>
    </React.Fragment>
  );
}

export default CreateRecipes;
