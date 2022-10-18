
import React from 'react';
import { Container } from '@mui/material';
import PageTitle from '../../components/UI/PageTitle';
import AddRecipeForm from '../../components/Forms/AddRecipeForm';
/*

title, description, prep time in minutes, cooking time in minutes, servings

*/
const CreateRecipes = () => {
  return (
    <Container>
      <PageTitle>Add Recipe</PageTitle>
      <AddRecipeForm />
    </Container>
  );
}

export default CreateRecipes;
