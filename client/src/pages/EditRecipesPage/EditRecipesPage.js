
import React from 'react';
import { Box } from '@mui/material';
import RecipeForm from '../../components/Forms/RecipeForm';
import TopBanner from '../../components/UI/TopBanner';
import { useParams } from "react-router-dom";


const EditRecipes = () => {
  const params= useParams();

  return (
   <Box sx={{ position: "relative" }}>
      <TopBanner classStyles={{
        position: 'absolute',
        top: '-50px',
        background: "url(/add-recipe-background-header-img.png) top repeat-x"
      }}/>
      <Box sx={{position: 'relative'}}>
        <RecipeForm
          id={params.id}
        />
      </Box>
    </Box>
  );
}



export default EditRecipes;
