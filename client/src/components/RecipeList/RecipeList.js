
import React, { useState, useEffect } from 'react'
import RecipeListCard from './RecipeListCard';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

const pageSize = 2;

const RecipeList = (props) => {
  // Need to create an api call to grab
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const offset = pageSize * (currPage - 1);

  const fetchRecipeData = async (page, offset, limit) => {
    axios({
      method: "get",
      url: `http://localhost:5051/api/recipes/get?page=${page}&offset=${offset}&limit=${limit}`,
    })
      .then((response) => {
        const { count, data } = response.data;
        setRecipes(data);
        setTotalRecipes(count);
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  useEffect(() => {
    fetchRecipeData(currPage, offset, pageSize);
  }, [currPage, offset]);

  const handlePage = (_event, value) => {
    setCurrPage(value);
  }

  return (
    <React.Fragment>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {recipes ? recipes.map(recipe => {
        return (
          <Grid item xs={2} sm={4} md={4} key={recipe.id}>
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
      count={totalRecipes}
      sx={{
        mt:'2rem',
        mb: '2rem',
        display: 'flex',
        justifyContent: 'center'
      }}
      onChange={handlePage}
    />
    </React.Fragment>
  )
}

export default RecipeList;
