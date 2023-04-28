import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import DisplayRecipe, { loader as recipeLoader } from "./components/recipes/DisplayRecipe";
import Layout, { loader as layoutLoader } from "./components/Layout";
import EditRecipe, { loader as editRecipeLoader } from "./components/recipes/EditRecipe";

import Default from "./components/recipes/Default";
import ErrorPage from "./components/ErrorPage";
import NoPage from "./components/recipes/NoPage";

import { action as deleteRecipe } from "./routes/delete";
import { action as createRecipe } from "./components/recipes/NewRecipe";
import { action as toggleStar } from "./components/recipes/FavoriteStar";
import { action as saveRecipe } from "./components/recipes/EditRecipe";

import "bootstrap/dist/css/bootstrap.min.css";

// Define our routes for React Router.
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      loader={layoutLoader}
      action={createRecipe}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Default />} />
        <Route
          path="recipes/:recipeId"
          element={<DisplayRecipe />}
          loader={recipeLoader}
          action={toggleStar}
        />
        <Route
          path="recipes/:recipeId/edit"
          element={<EditRecipe />}
          loader={editRecipeLoader}
          action={saveRecipe}
        />
        <Route
          path="recipes/:recipeId/delete"
          action={deleteRecipe}
        />
        <Route path="*" element={<NoPage />} />    
      </Route>
    </Route>
  )  
);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
