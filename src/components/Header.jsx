import React from "react";
import { Offcanvas } from "react-bootstrap";

import styles from "./Header.module.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import RecipeList from "./recipes/RecipeList";
import FilterRecipes from "./recipes/FilterRecipes";
import NewRecipe from "./recipes/NewRecipe";

export default function Header({
  q,
  qType,
  recipes,
  recipeTypes,
  unsavedChanges,
  setUnsavedChanges,
}) {
  return (
    <header className="m-0 p-0">
      <Navbar
        sticky="top"
        expand={false}
        collapseOnSelect
        aria-disabled
        className="p-0"
      >
        <Container fluid className={`${styles.pageHeader} px-3 py-2`}>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${false}`}
            className={`${styles.toggleButton} px-1`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
          >
            <Offcanvas.Header
              closeButton
              className={`${styles.menuTitle} px-3 py-2`}
            >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                <img
                  width="50"
                  className="me-3"
                  src={process.env.PUBLIC_URL + "/logo.webp"}
                  alt="Logo"
                />
                Recipe Library
              </Offcanvas.Title>
            </Offcanvas.Header>
            <div className={`${styles.menuSection} p-3`}>
              <FilterRecipes
                q={q}
                qType={qType}
                recipeTypes={recipeTypes}
                unsavedChanges={unsavedChanges}
                setUnsavedChanges={setUnsavedChanges}
              />
              <NewRecipe
                unsavedChanges={unsavedChanges}
                setUnsavedChanges={setUnsavedChanges}
              />
            </div>
            <Offcanvas.Body className={styles.recipeMenu}>
              <RecipeList
                q={q}
                qType={qType}
                recipes={recipes}
                unsavedChanges={unsavedChanges}
                setUnsavedChanges={setUnsavedChanges}
              />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Brand className="p-0 m-0 pt-1 pe-2">
            <div className="d-flex">
              <h3 className="pt-2">Recipe Library</h3>
              <img
                width="50"
                className="ms-3 pb-1"
                src={process.env.PUBLIC_URL + "/logo.webp"}
                alt="Logo"
              />{" "}
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}
