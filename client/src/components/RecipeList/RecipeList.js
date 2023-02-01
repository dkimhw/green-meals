
import React, { useState, useEffect } from 'react'
import RecipeListCard from './RecipeListCard';
import axios from 'axios';



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
        console.log(data);
      })
      .catch(error => console.error(`Error: ${error}`));

  }

  useEffect(() => {
    fetchRecipeData(1, 1, 0);
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
      {recipes ? recipes.map(recipe => {
        return (
          <RecipeListCard
            key={recipe.id}
            recipeTitle={recipe.recipe_name}
          >
          </RecipeListCard>
        )
      }) : '' }

    </React.Fragment>

  )
}

export default RecipeList;
