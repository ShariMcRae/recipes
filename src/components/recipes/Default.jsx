import React from "react";
import recipeImg from "../../images/dinnerPlate.webp";
import styles from '../../css/layout.module.css';
export default function Default() {
  return (
    <div className={styles.centerOnPage}>
      <img width="150" src={recipeImg} alt="Recipe icon."/>
    </div>
  );
}
