
import React, { useState, useEffect } from 'react'
import RecipeListCard from './RecipeListCard';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';


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
    fetchRecipeData(1, 2, 0);
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
    <React.Fragment>
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
    <Pagination
      count={4}
      sx={{
        mt:'2rem',
        mb: '2rem',
        display: 'flex',
        justifyContent: 'center'
      }}
      disabled
    />
    </React.Fragment>
  )
}

export default RecipeList;
