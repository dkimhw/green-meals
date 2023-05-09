
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useParams } from "react-router-dom";
import RecipePageSectionHeader from './RecipePageSectionHeader';
import ActionBar from '../../components/UI/ActionBar';
import InfoBox from '../../components/UI/InfoBox';
import { IngredientsList } from '../../components/UI/IngredientsList';
import DirectionList from '../../components/UI/DirectionList';
import { RecipeCarousel } from '../../components/RecipeCarousel/RecipeCarousel';

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
      <RecipeCarousel
        recipeID = { params.id }
      />
      <InfoBox
        prepTime={recipeData ? recipeData['prep_time'] : ''}
        prepTimeQty={recipeData? recipeData['prep_time_qty'] : ''}
        cookTime={recipeData ? recipeData['cooking_time'] : ''}
        cookTimeQty={recipeData? recipeData['cooking_time_qty'] : ''}
        servings={recipeData? recipeData['servings'] : ''}
      />
      <IngredientsList
        ingredients={recipeData? recipeData['ingredients'] : ''}
      />
      <DirectionList
        directions={recipeData? recipeData['instructions'] : '' }
      />
    </Container>
  );
}

export default RecipePage;
