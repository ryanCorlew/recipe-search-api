import React from "react";

const Recipes = (props) => (
  <div className="container">
    <div className="row">
      {props.recipes.map((recipe) => {
        return (
          <div key={recipe.id} className="col-md-4">
            <div className="recipe__box">
              <img
                className="recipe__box-img"
                src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`}
                alt={recipe.title}
              />
              <div className="recipe__text">
                <h5>{recipe.title}</h5>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Recipes;