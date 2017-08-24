import React, { Component } from 'react';
import axios from 'axios';


class RecipeSearch extends Component {
  constructor(props) {
    super(props);


    this.state={
      recipe: {},
      newMeal: this.props.newMeal,
      recipeSearch: "",
      newRecipe: "",
      searchResults: [],
    };
  }

  recipeChangeHandler(event) {
    const recipeSearch = event.target.value;
    this.setState({
      recipeSearch: recipeSearch
    });
  }

  searchSubmitHandler(event) {
    let config = {"X-Mashape-Key": "thENAA1AsWmshrk3g1Wkjto9yLEcp1l5DdUjsnNgmYe1qsTLC4",
                    "Accept": "application/json"};

    axios.get("/api/recipes/" + this.state.recipeSearch, {headers: config})
      .then((response) => {
        const searchResults = response.data.results;
        console.log(searchResults);
        this.setState({
          searchResults: searchResults
        });
      });
    event.preventDefault();
  }

  saveRecipe(event) {
    const newRecipe = this.state.searchResults[event.target.value];
    console.log(newRecipe);
    this.setState({
      newRecipe: newRecipe,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.searchSubmitHandler.bind(this)}>
          <input type="text" onChange={this.recipeChangeHandler.bind(this)} placeholder="SEARCH FOR RECIPES" />
          <input type="submit" value="submit" />
        </form>
        <ul>
          {this.state.searchResults.map((singleRecipe, i) =>
            <div>
              <li key={singleRecipe.title}><img src={singleRecipe.image} /></li>
              <li className="recipeTitle">{singleRecipe.title}</li>
              <li className="recipeSourceName"><em>from: {singleRecipe.sourceName}</em></li>
              <li className="saveRecipeBtn"><button value={i} onClick={this.saveRecipe.bind(this)}>SAVE</button></li>
            </div>
          )}
        </ul>
      </div>
    );
  }

}

export default RecipeSearch;
