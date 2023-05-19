
import React from 'react';
import { Container } from '@mui/material';
import RecipeForm from '../../components/Forms/RecipeForm';
import TopBanner from '../../components/UI/TopBanner';
import { useParams } from "react-router-dom";


const EditRecipes = () => {
  const params= useParams();

  return (
   <Container sx={{ position: "absolute" }}>
      <TopBanner classStyles={{
        left: '0',
        top: '0',
        background: "url(/add-recipe-background-header-img.png) top repeat-x"
      }}/>
      <RecipeForm
        id={params.id}
      />
    </Container>
  );
}

export default EditRecipes;
