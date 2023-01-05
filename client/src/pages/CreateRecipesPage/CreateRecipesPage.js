
import React from 'react';
import { Container } from '@mui/material';
import PageTitle from '../../components/UI/PageTitle';
import AddRecipeForm from '../../components/Forms/AddRecipeForm';
import TopBanner from '../../components/UI/TopBanner';

const CreateRecipes = () => {
  return (
   <Container>
      {/* <PageTitle>Add Recipe</PageTitle> */}
      <TopBanner classStyles={{
        top: '7.5%',
        left: '0',
        background: "url(/add-recipe-background-header-img.png) top repeat-x"
      }}/>
      <AddRecipeForm />
    </Container>
  );
}

export default CreateRecipes;
