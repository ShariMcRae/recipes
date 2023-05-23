import React from "react";
import styles from './Default.module.css';

export default function Default() {
  return (
    <div className={`${styles.defaultPage} d-flex align-items-center justify-content-center`}>
      <img src={process.env.PUBLIC_URL + '/logo.webp'} alt="Logo"/>
    </div>
  );
}
