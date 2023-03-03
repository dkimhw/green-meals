
import React, { useState, useEffect } from 'react'
import RecipeListCard from './RecipeListCard';
import axios from 'axios';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const RecipeList = (props) => {
  // Need to create an api call to grab
  const [recipes, setRecipes] = useState([]);

  const fetchRecipeData = async (page, limit, offset) => {
    axios({
      method: "get",
      url: `http://localhost:5051/api/recipes/get?page=${page}&limit=${limit}&offset=${offset}`,
    })
      .then((response) => {
        const data = response.data;
        setRecipes(data);
      })
      .catch(error => console.error(`Error: ${error}`));

  }

  useEffect(() => {
    fetchRecipeData(1, 10, 0);
  }, [])

  // const data = fetchRecipeData(1, 1, 0);
  // console.log(data);
  //setRecipes(data);
  // useEffect(() => {
  //   const response = fetchRecipeData(1, 1, 0);
  //   console.log(response);
  //   setRecipes(response);
  // }, [recipes])

  return (

    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {recipes ? recipes.map(recipe => {
        return (
          <Grid item xs={2} sm={4} md={4}>
            <RecipeListCard
                key={recipe.id}
                recipeId={recipe.id}
                recipeTitle={recipe.recipe_name}
            >
            </RecipeListCard>
          </Grid>
        )
      }) : '' }

    </Grid>

  )
}

export default RecipeList;
