import React from "react";
import { useRouteError } from "react-router-dom";
import styles from '../css/layout.module.css';

// Display errors in a standard way.
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.centerOnPage}>
      <h1>Oh my!</h1>
      <p>An unexpected error has occurred.</p>
      <p>
        <i>
        {
          // @ts-ignore
          error.statusText || error.message
        }
        </i>
      </p>
    </div>
  );
}