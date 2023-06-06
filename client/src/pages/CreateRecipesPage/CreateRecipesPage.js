
import React from 'react';
import { Box } from '@mui/material'
import RecipeForm from '../../components/Forms/RecipeForm';
import TopBanner from '../../components/UI/TopBanner';

const CreateRecipes = () => {
  return (
    <Box sx={{position: 'relative'}}>
        <TopBanner classStyles={{
          position: 'absolute',
          top: '-50px',
          background: "url(/add-recipe-background-header-img.png) top repeat-x"
        }}/>
        <Box sx={{position: 'relative'}}>
          <RecipeForm />
        </Box>
    </Box>

  );
}

export default CreateRecipes;
