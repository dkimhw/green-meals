
import React from 'react';
import { Container } from '@mui/material';
import AddRecipeForm from '../../components/Forms/RecipeForm';
import TopBanner from '../../components/UI/TopBanner';

const CreateRecipes = () => {
  return (
   <Container>
      <TopBanner classStyles={{
        left: '0',
        background: "url(/add-recipe-background-header-img.png) top repeat-x"
      }}/>
      <AddRecipeForm />
    </Container>
  );
}

export default CreateRecipes;
