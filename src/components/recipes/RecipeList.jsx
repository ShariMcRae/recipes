import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { Badge, ListGroup, Nav } from "react-bootstrap";

import styles from './RecipeList.module.css';

// Display the list of recipes, allowing users
// to select from them, and pass along the search/filter
// parameters on the URL when navigating to 
// the selected recipe.
const RecipeList = ({
  q,
  qType,
  recipes,
  unsavedChanges,
  setUnsavedChanges,
}) => {
  return (
    <Nav className={`${styles.recipes}`}>

      {recipes.length ? (
        <>
          {recipes.map((recipe) => (
            <Nav.Link className="p-0"
              key={recipe.id}
              href={`/${recipe.id}?q=${q ? q : ""}&qType=${qType}`}

              onClick={(event) => {
                if (
                    !unsavedChanges ||
                    window.confirm(
                    "There are unsaved changes to the current recipe. Do you wish to continue?"
                    )
                )
                    setUnsavedChanges(false);
                else {
                    event.preventDefault();
                    return false;
                }}}


            >
              <ListGroup>
                <ListGroup.Item className="d-flex justify-content-between ps-2 pe-0 py-2">
                  <div>
                    {recipe.description ? (
                      <>{recipe.description}</>
                    ) : (
                      <i>No Description</i>
                    )}
                  </div>
                  <Badge bg="inherit" pill className={styles.recipeList}>
                    {recipe.favorite && 
                    <h5 className={`${styles.recipeList} mt-1`}>★</h5>}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Nav.Link>
          ))}
        </>
      ) : (
        <p>
          <i>No recipes.</i>
        </p>
      )}
    </Nav>
  );
}

export default memo(RecipeList);