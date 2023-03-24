import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './pages/HomePage/HomePage';
import CreateRecipesPage from './pages/CreateRecipesPage/CreateRecipesPage';
import { appTheme } from "./theme/muiThemeOptions";
import EditRecipesPage from "./pages/EditRecipesPage/EditRecipesPage";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/create-recipes" element={<CreateRecipesPage />} />
            <Route path="/edit-recipe/:id" element={<EditRecipesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
