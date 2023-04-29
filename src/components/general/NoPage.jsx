import React from "react";
import styles from './NoPage.module.css';

export default function NoPage() {
  return (
    <div className={styles.centerOnPage}>
      <h2>Page Not Found</h2><br/>
      <img src={process.env.PUBLIC_URL + '/logo.webp'} alt="Logo" />
    </div>
  );
}
