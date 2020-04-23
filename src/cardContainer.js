import React from "react";
import RecipeCard from "./recipeCard";

const CardContainer = (props) => {
  return (
    <div className="card-container">
      {props.recipes.map((recipe) => {
        return <RecipeCard recipe={recipe}></RecipeCard>;
      })}
    </div>
  );
};

export default CardContainer;
