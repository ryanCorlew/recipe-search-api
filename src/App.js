import React, { Component } from "react";
import "./App.css";

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = "2c91f4cd2f4849ad8c7712071af5e464";

class App extends Component {
  state = {
    recipes: [],
  };

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(
      `https://api.spoonacular.com/recipes/search?query=${recipeName}&number=100&apiKey=${API_KEY}`
    );

    const data = await api_call.json();
    this.setState({ recipes: data.results });
    console.log(this.state.recipes);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
