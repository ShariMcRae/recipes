import React, { memo } from "react";
import { Form, useLoaderData } from "react-router-dom";

import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import FavoriteStar from "./FavoriteStar";
import { getRecipe } from "../../rest/recipes";

import styles from './DisplayRecipe.module.css';

// Load the recipe. Throw an error if it's not found.
// Put the recipe type in the description. 
// Pass along search/filter parameters, 
// so our menu doesn't change.
export async function loader({ params, request }) {

  const recipe = await getRecipe(params.recipeId);
  if (!recipe) throw new Error("Recipe not found.");
  else
    recipe.description += recipe.recipeType
      ? " (" + recipe.recipeType + ")" : "";

  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const qType = url.searchParams.get("qType");
  return { recipe, q, qType };
}

// Display specified recipe with buttons for
// making it a favorite, editing, and deleting.
const DisplayRecipe = () => {
  
  // @ts-ignore
  const { recipe, q, qType } = useLoaderData();
  return (
    <div className={styles.recipe}>
      <div className="me-4">
        <div>
          <img
            className="img-thumbnail"
            key={recipe.imageURL}
            src={recipe.imageURL || null}
            alt={recipe.description}
          />
        </div>
        <h3>
          {recipe.description ? (
            <>{recipe.description}</>
          ) : (
            <i>No Description</i>
          )}{" "}
          <FavoriteStar recipe={recipe} />
        </h3>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <div className="my-3">
            <h5>Ingredients</h5>
            {recipe.ingredients.map((ingredient, index) => (
              <ListGroup.Item key={index}>
                <span>{ingredient}</span>
              </ListGroup.Item>
            ))}
          </div>
        ) : (
          <div className="my-3">
            <i>No Ingredients</i>
          </div>
        )}
      </div>
      <div>
        {recipe.instructions ? (
          <>
            <h5>Instructions</h5>
            <p className="me-5">{recipe.instructions}</p>
          </>
        ) : (
          <p className="me-5">
            <i>No Instructions</i>
          </p>
        )}
      </div>

      <div className="pt-2">
        <div className="d-flex justify-content-start">
          <Form action="edit">
            <FormControl type="hidden" name="q" value={q?q:""} />
            <FormControl type="hidden" name="qType" value={qType?qType:""} />
            <Button type="submit" className={`${styles.recipe} me-2`}>
              Edit
            </Button>
          </Form>

          {/* We post the form when deleting (unlike when editing)
              to trigger a reload of the navigation pane. */}
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!window.confirm("Please confirm that you want to delete this recipe."))
                event.preventDefault();
            }}
          >
            <FormControl type="hidden" name="q" value={q?q:""} />
            <FormControl type="hidden" name="qType" value={qType?qType:""} />              
            <Button type="submit" className={styles.recipe}>Delete</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default memo(DisplayRecipe);