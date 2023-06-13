// pages
import HomePage from '../pages/HomePage/HomePage';
import CreateRecipesPage from '../pages/CreateRecipesPage/CreateRecipesPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

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
  {
    key: "sign-up-route",
    title: "Sign Up",
    path: "/sign-up",
    enabled: true,
    component: SignUpPage,
  },

];

export default routes;
