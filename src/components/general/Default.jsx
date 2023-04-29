import React from "react";
import styles from './Default.module.css';

export default function Default() {
  return (
    <div className={styles.centerOnPage}>
      <img src={process.env.PUBLIC_URL + '/logo.webp'} alt="Logo" />
    </div>
  );
}
