import React from "react";
import { Link } from "react-router-dom";

const cardStyle = {
  margin: "0 0 2rem 0",
  //   borderRadius: "5px",
  //   boxShadow: "0px 0px 7px 2px rgba(0,0,0,0.75)",
  //   padding: "8px",
};

const Recipes = (props) => {
  return (
    <div className="container">
      <div className="row">
        {props.recipes.map((recipe) => {
          return (
            <div key={recipe.id} className="col-md-4" style={cardStyle}>
              <div className="recipes__box">
                <img
                  className="recipe__box-img"
                  src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`}
                  alt={recipe.title}
                />
                <div className="recipe__text">
                  <h5 className="recipes__title">
                    {recipe.title.length < 20
                      ? `${recipe.title}`
                      : `${recipe.title.substring(0, 25)}...`}
                  </h5>
                </div>
                <button className="recipe__buttons">
                  <Link
                    to={{
                      pathname: `/recipe/${recipe.id}`,
                      state: { recipe: recipe.title },
                    }}
                  >
                    View Recipe
                  </Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recipes;
