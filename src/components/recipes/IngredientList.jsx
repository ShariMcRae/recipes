import React, { memo } from "react";
import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

import styles from "./IngredientList.module.css";

// Create a card to hold the list of ingredients.
// Allow for rows to be deleted and added.
const IngredientListEdit = ({
  ingredients,
  setIngredients,
  setUnsavedChanges,
}) => {
  const [newIngredient, setNewIngredient] = useState("");

  const removeIngredient = (index) => {
    let temp = [...ingredients];
    temp.splice(index, 1);
    setIngredients(temp);
    setUnsavedChanges(true);
  };

  const addIngredient = () => {
    let temp = [...ingredients];
    temp.push(newIngredient);
    setNewIngredient("");
    setIngredients(temp);
    setUnsavedChanges(true);
  };

  return (
    <FormGroup className="pt-3 pb-4">
      <Card>
        <Card.Header className={styles.cardHeader}>
          <Container className="p-0">
            <Row className="px-0">
              <Col className="px-2">
                <div>Ingredients</div>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body className="p-0">
          {ingredients.map((ingredient, index) => (
            <ListGroup.Item
              className={`${styles.ingredientListItem} border`}
              key={index}
            >
              <Button
                className="recipe btn-sm pt-0 pb-0 me-2"
                title="Delete Ingredient"
                onClick={() => removeIngredient(index)}
              >
                𐌢
              </Button>
              {ingredient}

              <FormControl
                type="hidden"
                name={"ingredients[" + index + "]"}
                value={ingredient}
              />
            </ListGroup.Item>
          ))}
        </Card.Body>

        <Card.Footer className={styles.cardFooter}>
          <Stack
            // @ts-ignore
            gap="2"
            direction="horizontal"
          >
            <FormControl
              id="newIngredient"
              aria-label="New Ingredient."
              placeholder="Add ingredient."
              type="text"
              value={newIngredient}
              onChange={(event) => setNewIngredient(event.currentTarget.value)}
            />
            <Button
              className="recipe btn-sm"
              type="button"
              onClick={() => addIngredient()}
            >
              Add
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
    </FormGroup>
  );
};

export default memo(IngredientListEdit);
