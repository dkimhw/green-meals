
import React, { useState, useEffect } from 'react'
import RecipeListCard from './RecipeListCard';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

const pageSize = 4;


const RecipeList = (props) => {
  // Need to create an api call to grab
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState();
  const [currPage, setCurrPage] = useState(1);
  const offset = pageSize * (currPage - 1);

  const fetchRecipeData = async (page, offset, limit) => {
    axios({
      method: "get",
      url: `http://localhost:5051/api/recipes/get?page=${page}&offset=${offset}&limit=${limit}`,
    })
      .then((response) => {
        const { count, rows } = response.data;
        setRecipes(rows);
        setTotalRecipes(count / pageSize);
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
    <Grid
      container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }}
      // sx={{display: 'flex', flexDirection: 'column'}}
      alignItems="stretch"
      justify="space-between"
    >
      {recipes ? recipes.map(recipe => {
        return (
          <Grid item xs={3} sm={3} md={3} key={recipe.id} sx={{
            display: "flex", flexDirection: "column"
          }}>
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
