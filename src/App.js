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
      `https://api.spoonacular.com/recipes/search?query=${recipeName}&number=10&apiKey=${API_KEY}`
    );

    const data = await api_call.json();
    this.setState({ recipes: data.results });
  };

  // componentDidMount = () => {
  //   const recipes = JSON.parse(localStorage.getItem("recipes"));

  //   this.setState({ recipes: recipes });
  // };

  // componentDidUpdate = () => {
  //   const recipes = JSON.stringify(this.state.recipes);
  //   localStorage.setItem("recipes", recipes);
  // };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
          <h2 className="App-subtitle">With the Spoonacular API</h2>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
