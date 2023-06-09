import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import { getRecipes } from "../rest/recipes";
import { getRecipeTypes } from "../rest/recipeTypes";

import styles from "./Layout.module.css";
import Header from "./Header";

// Load the list of recipes matching the
// search and filter parameters, adjusting
// the recipe descriptions to include the recipe type
// and sorting in alphabetical order.
// Also load the recipe types.
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  let qType = url.searchParams.get("qType");
  if (!qType) qType = "0";

  const recipeTypes = await getRecipeTypes("", "typeName", "asc");
  let recipes = await getRecipes(q, "", "", recipeTypes);
  recipes = recipes.filter(
    (recipe) => recipe.recipeTypeId === qType || qType === "0" || !qType
  );
  recipes = recipes.map(fixDescription);
  recipes.sort(compareFn);

  return { recipes, recipeTypes, q, qType };
}

// Helper function to incorporate the recipe type into the description.
function fixDescription(recipe) {
  recipe.description =
    (recipe.recipeType ? recipe.recipeType + " - " : "") +
    (recipe.description ? recipe.description : "");
  return recipe;
}

// Helper function to sort recipes by description.
function compareFn(a, b) {
  if (a.description.toLowerCase() < b.description.toLowerCase()) return -1;
  if (a.description.toLowerCase() > b.description.toLowerCase()) return 1;
  return 0;
}

// Provides the page layout with a navigation
// pane on the left side of the page.
export default function Layout() {
  // @ts-ignore
  const { recipes, recipeTypes, q, qType } = useLoaderData();

  // Track whether there are unsaved changes on the recipe edit form.
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Render the overall page layout/structure with menu
  // on the left, a dividing line that can be used to hide/show the menu,
  // and an outlet on the right for updating the page content.
  return (
    <>
      <header className={`fixed-top`}>
        <Header
          q={q}
          qType={qType}
          recipes={recipes}
          recipeTypes={recipeTypes}
          unsavedChanges={unsavedChanges}
          setUnsavedChanges={setUnsavedChanges}
        />
      </header>
      <main className={`p-5`}>
        <div className={`${styles.detail}`}>
          <Outlet context={[unsavedChanges, setUnsavedChanges]} />
        </div>
      </main>
      <footer className={`${styles.recipeFooter} fixed-bottom p-4`}></footer>
    </>
  );
}
