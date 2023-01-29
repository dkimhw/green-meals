
import { useState, useEffect } from 'react'
import RecipeListCard from './RecipeListCard';
import axios from 'axios';

const fetchRecipeData = async (page, limit, offset) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:5051/api/recipes/get?page=${page}&limit=${limit}&offset=${offset}`,
  });
  console.log(response);
}

const RecipeList = (props) => {
  // Need to create an api call to grab
  const [recipes, setRecipes] = useState([]);
  axios
  .get("https://localhost:5051/api/recipes/get?page=1&limit=10")
  .then(function (response) {
    console.log(response);
  });

  useEffect(() => {
    const response = fetchRecipeData(1, 1, 0);
    console.log(response);
    setRecipes(response);
  }, [recipes])

  return (
    <RecipeListCard>

    </RecipeListCard>
  )
}

export default RecipeList;
