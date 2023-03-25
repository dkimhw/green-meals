
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from '@mui/material';

import { useParams } from "react-router-dom";
import RecipePageSectionHeader from './RecipePageSectionHeader';

const RecipePage = (props) => {
  const params= useParams();
  const [recipeData, setRecipeData] = useState();

  const fetchAllRecipeData = async (recipeID) => {
    axios({
      method: "get",
      url: `http://localhost:5051/api/recipes/get/${recipeID}`,
    })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setRecipeData(data[0]);
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  useEffect(() => {
    if(params.id) fetchAllRecipeData(params.id);
  }, [params.id]);

  return (
    <Container>
      <RecipePageSectionHeader
        recipeTitle = {recipeData ? recipeData['recipe_name'] : ''}
      />
    </Container>
  );
}

export default RecipePage;
