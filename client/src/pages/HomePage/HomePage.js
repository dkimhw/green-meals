

import React from "react";
import { Container } from '@mui/material';
import RecipeList from "../../components/RecipeList/RecipeList";

const Home = (props) => {
  return (
    <Container>
      <h1>Home</h1>
      <RecipeList/>
    </Container>
  );
}

export default Home;
