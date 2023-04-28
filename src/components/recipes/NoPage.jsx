import React from "react";
import recipeImg from "../../images/dinnerPlate.webp";
import styles from '../../css/layout.module.css';

export default function NoPage() {
  return (
    <div className={styles.centerOnPage}>
      <h2>Page Not Found</h2><br/>
      <img width="150" src={recipeImg} alt="Recipe icon."/>
    </div>
  );
}
