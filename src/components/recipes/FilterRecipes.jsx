import React, { memo, useEffect, useState } from "react";
import { Form, useSubmit } from "react-router-dom";

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import FormSelect from "react-bootstrap/FormSelect";

// Display a form for submitting search and filter parameters
// for updating the list of recipes on the menu.
const FilterRecipes = ({
  q,
  qType,
  recipeTypes,
  unsavedChanges,
  setUnsavedChanges,
}) => {

  // Store old values because...when these are changed while a form 
  // with unsaved changes is open, we will need to revert them back.
  const [oldValue, setOldValue] = useState("");
  const [oldTypeValue, setOldTypeValue] = useState("");
  const submit = useSubmit();

  // Update the search/filter input fields
  // if they use the back or forward buttons.
  useEffect(() => {
    // @ts-ignore
    document.getElementById("q").value = q;
  }, [q]);

  useEffect(() => {
    // @ts-ignore
    document.getElementById("qType").value = qType;
  }, [qType]);

  // Display form for submitting search
  // and filter parameters.
  return (
    <Form id="search-form" role="search" className="w-100">
      <InputGroup id="search" className="d-flex flex-nowrap">
        <InputGroup.Text id="search-symbol">🔍</InputGroup.Text>
        <FormControl
          id="q"
          name="q"
          aria-label="Search recipes."
          placeholder="Search"
          type="search"
          defaultValue={q}
          onChange={(event) => {
            if (
              !unsavedChanges ||
              window.confirm(
                "There are unsaved changes to the current recipe. Do you wish to continue?"
              )
            ) {
              setUnsavedChanges(false);
              setOldValue(q);
              submit(event.currentTarget.form);
            } else {
              event.currentTarget.value = oldValue;
              event.currentTarget.blur();
            }
          }}
        />
      </InputGroup>

      <FormSelect
        id="qType"
        name="qType"
        className="me-2 mt-2"
        defaultValue="0"
        placeholder="Recipe Type"
        onChange={(event) => {
          if (
            !unsavedChanges ||
            window.confirm(
              "There are unsaved changes to the current recipe. Do you wish to continue?"
            )
          ) {
            setUnsavedChanges(false);
            setOldTypeValue(qType);
            submit(event.currentTarget.form);
          } else {
            event.currentTarget.value = oldTypeValue;
            event.currentTarget.blur();
          }
        }}
      >
        <option value="0">Filter by recipe type.</option>
        {recipeTypes.map((recipeType) => (
          <option value={recipeType.id} key={recipeType.id}>
            {recipeType.typeName}
          </option>
        ))}
      </FormSelect>
    </Form>
  );
}

export default memo(FilterRecipes);