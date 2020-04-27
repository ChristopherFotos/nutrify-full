import React from "react";

const RecipeCard = (props) => {
  return (
    <div className="grid-card">
      <img
        src={props.recipe.recipe.image}
        className="card-img"
        alt="the finished product"
      />
      <span className="recipe-title">{props.recipe.recipe.label}</span>
      <div className="card-content">
        <span className="show-details show-details-open">Show details</span>
        <ul className="card-content-closed">
          {props.recipe.recipe.ingredientLines.map((ingredientLine) => {
            return <li>{ingredientLine}</li>;
          })}
        </ul>
        <div className="recipe-summary-div">
          6 ingredients | Low carb | Low fat | Martha Stewart
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
