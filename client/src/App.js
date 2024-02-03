import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './pages/HomePage/HomePage';
import CreateRecipesPage from './pages/CreateRecipesPage/CreateRecipesPage';
import { appTheme } from "./theme/muiThemeOptions";
import EditRecipesPage from "./pages/EditRecipesPage/EditRecipesPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import CreateReviewsPage from "./pages/CreateReviewsPage/CreateReviewsPage";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/create-recipes" element={<CreateRecipesPage />} />
            <Route path="/create-reviews" element={<CreateReviewsPage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/edit-recipe/:id" element={<EditRecipesPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
