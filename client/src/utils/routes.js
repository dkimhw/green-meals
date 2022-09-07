// pages
import HomePage from '../pages/HomePage/HomePage';
import CreateRecipesPage from '../pages/CreateRecipesPage/CreateRecipesPage';

export const routes = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: HomePage,
  },
  {
    key: "create-recipe-route",
    title: "Create Recipes",
    path: "/create-recipes",
    enabled: true,
    component: CreateRecipesPage,
  },

];

export default routes;
