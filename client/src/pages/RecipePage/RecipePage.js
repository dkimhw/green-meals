
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
import RecipeReviewForm from "../../components/RecipeReviewForm/RecipeReviewForm";
import Divider from '../../components/UI/Divider';
import ReviewList from '../../components/ReviewList/ReviewList';

// Check reviews
// If exists add divider, reviews list

const RecipePage = (props) => {
  const params= useParams();
  const [recipeData, setRecipeData] = useState();

  const fetchRecipeData = async (recipeID) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:5051/api/recipes/get/${recipeID}`,
      });
      setRecipeData(response.data[0]);
    } catch (err) {
      console.error(`Error: ${err}`);
      throw new Error(err);
    }
  }

  useEffect(() => {
    if(params.id) {
      fetchRecipeData(params.id);
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
      <Divider borderCSS={{border: '#adadad 1px solid'}}/>
      <IngredientsList
        ingredients={recipeData? recipeData['ingredients'] : ''}
      />
      <DirectionList
        directions={recipeData? recipeData['instructions'] : '' }
      />
      <Divider borderCSS={{border: '#adadad 1px solid'}}/>
      <RecipeReviewForm />
      <Divider borderCSS={{border: '#adadad 1px solid'}}/>
      <ReviewList />
    </Container>
  );
}

export default RecipePage;
