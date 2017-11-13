import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import { TimelineMax } from 'gsap';
import GSAP from 'react-gsap-enhancer';
import PartyBoard from './PartyBoard';
import RecipeCard from './RecipeCard';

class RecipeSearch extends Component {
  constructor(props) {
    super(props);

    this.state={
      recipe: {},
      recipeSearch: "",
      newRecipe: "",
      searchResults: [],
      yposition: 0,
      currentRecipe: {},
      currentRecipeFlag: false
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
    axios.put('/api/parties/' + history.location.state.newParty._id + '/meals/' + history.location.state.newMeal._id, {
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

  downArrowHandler() {
    const recipeResultsList = new TimelineMax();
    recipeResultsList.to(".recipeGrid", 2, {y:this.state.yposition - 200, force3D:true}, 0.01);
    this.setState({yposition: this.state.yposition-200});
  }

  upArrowHandler() {
    const recipeResultsListUp = new TimelineMax();
    recipeResultsListUp.to(".recipeGrid", 2, {y:this.state.yposition + 200, force3D:true}, 0.01);
    this.setState({yposition: this.state.yposition+200});
  }

  viewPartyBoardSwitch() {
    this.props.history.push('/partyboard', {newPartyId: history.location.state.newParty._id});
  }

  showRecipeCard(event) {
    const currentRecipe = this.state.searchResults[event.target.value];
    this.setState({
      currentRecipe: currentRecipe,
      currentRecipeFlag: true
    });
  }


  render() {
    return (
      <div className="homeContainer">
        <div className="homeLeft">
          <h2>Yay! Search For Awesome Recipes <br /><span><em>(By Ingredient)</em></span></h2>
          <button onClick={this.viewPartyBoardSwitch.bind(this)}>View Current Party</button>
          <img className="recipeSearchCharacters" src="img/recipeSearchCompCharacters.png" alt="cartoon food characters, search for cool recipes - foodies plan it" />
          <form className="emailsInputForm" onSubmit={this.searchSubmitHandler.bind(this)}>
            <input className="emailsInputField" type="text" onChange={this.recipeChangeHandler.bind(this)} placeholder="SPICY CHICKEN..." />
            <input className="emailsInputSubmit" type="submit" value=">" />
          </form>
        </div>
        <div className="homeRight">
          {(this.state.searchResults.length > 0) ? <img className="downArrow" onClick={this.downArrowHandler.bind(this)} src="img/downArrow.png" alt="click to scroll through recipe results" /> : "" }
          {(this.state.searchResults.length > 0) ? <img className="upArrow" onClick={this.upArrowHandler.bind(this)} src="img/upArrow.png" alt="click to scroll back through previous recipe results" /> : "" }
          <ul className="recipeGrid" style={{top: this.state.yposition}}>
            {this.state.searchResults.map((singleRecipe, i) =>
              <div className="recipeImgOuterContainer">
                <li className="recipeImgLI" key={singleRecipe.image}>
                  <div
                    className="recipeImg" alt="recipe Image" style={{
                    backgroundImage: 'url(' + singleRecipe.image + ')'
                    }}>
                    <button value={i} onClick={this.showRecipeCard.bind(this)}>VIEW RECIPE</button>
                  </div>
                </li>
              </div>
            )}
          </ul>
        </div>
        { this.state.currentRecipeFlag && <RecipeCard currentRecipe={this.state.currentRecipe} /> }
      </div>
    );
  }

}

//                  <li key={singleRecipe.title}className="recipeTitle">{singleRecipe.title}</li>
//                  <li key={singleRecipe.sourceName}className="recipeSourceName"><em>from: {singleRecipe.sourceName}</em></li>
//                  <li key={i} className="saveRecipeBtn"><button value={i} onClick={this.saveRecipe.bind(this)}>SAVE</button></li>


export default RecipeSearch;
