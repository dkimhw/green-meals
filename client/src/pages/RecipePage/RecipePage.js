
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useParams } from "react-router-dom";
import RecipePageSectionHeader from './RecipePageSectionHeader';
import ActionBar from '../../components/UI/ActionBar';

const RecipePage = (props) => {
  const params= useParams();
  const [recipeData, setRecipeData] = useState();

  const fetchAllRecipeData = async (recipeID) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:5051/api/recipes/get/${recipeID}`,
      });
      console.log(response.data);
      setRecipeData(response.data[0]);
    } catch (err) {
      console.error(`Error: ${err}`);
      throw new Error(err);
    }
  }

  useEffect(() => {
    if(params.id) {
      fetchAllRecipeData(params.id);
    }
  }, [params.id]);

  return (
    <Container
      maxWidth = 'sm'
    >
      <RecipePageSectionHeader
        recipeTitle = {recipeData ? recipeData['recipe_name'] : ''}
        recipeDescription = {recipeData ? recipeData['recipe_description'] : ''}
      />
      <ActionBar />
    </Container>
  );
}

export default RecipePage;
