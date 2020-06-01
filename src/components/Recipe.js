import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const API_KEY = "2c91f4cd2f4849ad8c7712071af5e464";

class Recipe extends React.Component {
  state = {
    activeRecipe: null,
    instructions: [],
    loading: false,
  };

  componentDidMount = async () => {
    const title = this.props.location.state.recipe;
    this.setState({ loading: true });
    const req = await fetch(
      `https://api.spoonacular.com/recipes/search?query=${title}&number=5&apiKey=${API_KEY}`
    );

    const res = await req.json();
    if (res && res.results[0]) {
      this.setState({ activeRecipe: res.results[0], loading: false });
      const instructionsReq = await fetch(
        `https://api.spoonacular.com/recipes/${res.results[0].id}/analyzedInstructions?apiKey=${API_KEY}`
      );
      const instructionsRes = await instructionsReq.json();
      if (instructionsRes && instructionsRes[0] && instructionsRes[0].steps) {
        this.setState({ instructions: instructionsRes[0].steps });
      }
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    const recipe = this.state.activeRecipe;

    const ingredients = this.state.instructions.map((el) => {
      return el.ingredients.map((ingredient) => {
        return <li key={ingredient.id}>{ingredient.name}</li>;
      });
    });

    const steps = this.state.instructions.map((el) => {
      return <li key={el.number}>{el.step}</li>;
    });

    return this.state.activeRecipe ? (
      <div>
        <header className="App-header">
          <div className="go-home">
            <Link to="/recipe-search-api">Go Home</Link>
          </div>
        </header>
        <div className="container">
          <div className="active-recipe">
            <img
              className="active-recipe__img"
              src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`}
              alt={recipe.title}
            />
            <h3 className="active-recipe__title">{recipe.title}</h3>
            <div className="recipe-instructions">
              <h4>Ingredients</h4>
              <ul>{ingredients}</ul>
              <h4>Instructions</h4>
              <ol>{steps}</ol>
            </div>
          </div>
          <button className="active-recipe__button">
            <Link to="/recipe-search-api">Go Home</Link>
          </button>
        </div>
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        {this.state.loading ? (
          <h1>Loading...</h1>
        ) : (
          <Fragment>
            <h1>Recipe Not Found</h1>
            <button className="active-recipe__button">
              <Link to="/">Go Home</Link>
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Recipe;
