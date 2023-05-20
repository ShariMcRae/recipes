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
        <Container fluid className={styles.menuTitle}>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${false}`}
            style={{
              backgroundSize: "0",
              borderWidth: 1,
              borderColor: "#d7e4fc",
              backgroundColor: "#d7e4fc",
            }}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
          >
            <Offcanvas.Header
              closeButton
              className={styles.menuTitle}
              style={{ backgroundColor: "#d7e4fc" }}
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
            <Offcanvas.Body style={{ backgroundColor: "#eaf0fb" }}>
              <div className={`${styles.search} mb-3`}>
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
            <h3>Recipe Library</h3>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}
