import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import {TweenMax} from 'gsap';
import GSAP from 'react-gsap-enhancer';
import PartyBoard from './PartyBoard';

class RecipeSearch extends Component {
  constructor(props) {
    super(props);

    this.state={
      recipe: {},
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
    const stepsArr = [];
    const ingredientsArr = [];

    this.setState({
      newRecipe: newRecipe,
    });

    newRecipe.analyzedInstructions.map((instruction) => {
      instruction.steps.map((el) => {
        stepsArr.push(el.step);
      });
    });

    newRecipe.analyzedInstructions.map((instruction) => {
      instruction.steps.map((el) => {
        el.ingredients.map((ingredient) => {
          ingredientsArr.push(ingredient.name);
        });
      });
    });

    // dishType: String,
    axios.put('/api/parties/' + this.props.newParty._id + '/meals/' + this.props.newMeal._id, {
      dishType: "",
      name: newRecipe.title,
      upvotes: 0,
      downvotes: 0,
      ingredients: ingredientsArr,
      directions: stepsArr
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  viewPartyBoardSwitch() {
    this.props.history.push('/partyboard', {newPartyId: this.props.newParty._id});
  }


  render() {
    console.log(this.props.history);
    return (
      <div>
      {console.log(this.props.newParty._id)}
        <form onSubmit={this.searchSubmitHandler.bind(this)}>
          <input type="text" onChange={this.recipeChangeHandler.bind(this)} placeholder="SEARCH FOR RECIPES" />
          <input type="submit" value="submit" />
        </form>
        <button onClick={this.viewPartyBoardSwitch.bind(this)}>View Current Party</button>
        <ul>
          {this.state.searchResults.map((singleRecipe, i) =>
            <div>
              <li key={singleRecipe.title}><img src={singleRecipe.image} alt="recipe search result"/></li>
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
