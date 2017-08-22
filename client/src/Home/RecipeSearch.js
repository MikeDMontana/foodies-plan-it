import React, { Component } from 'react';
import axios from 'axios';


class RecipeSearch extends Component {
  constructor(props) {
    super(props);


    this.state={
      recipe: {},
      recipeSearch: "",
      searchResults: []
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
        this.setState({
          searchResults: searchResults
        });
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.searchSubmitHandler.bind(this)}>
          <input type="text" onChange={this.recipeChangeHandler.bind(this)} placeholder="SEARCH FOR RECIPES" />
          <input type="submit" value="submit" />
        </form>
        <ul>
          {this.state.searchResults.map(singleRecipe =>
            <li key={singleRecipe.title}>{singleRecipe.title}</li>
          )}
        </ul>
      </div>
    );
  }

}

export default RecipeSearch;
