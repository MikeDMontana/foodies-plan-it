import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import RecipeSearch from './RecipeSearch';
import {TweenMax} from 'gsap';
import GSAP from 'react-gsap-enhancer';
import CreateParty from './CreateParty';

class NewMeal extends Component {
  constructor(props) {
    super(props);

    this.state= {
      newMeal: "",
      mealTitle: "",
      mealDescription: "",
      goToRecipeSearchFlag: false
    };
  }

  handleMealTitleChange(event) {
    const mealTitle = event.target.value;
    this.setState({
      mealTitle: mealTitle
    });
  }

  handleMealDescriptionChange(event) {
    const mealDescription = event.target.value;
    this.setState({
      mealDescription: mealDescription
    });
  }

  handleMealSubmit(event) {
    // When Meal is Submitted Put Meal into the meals model for each user selected
    // then response is party.meals. Set the most recent meal to newMeal
    axios.put('/api/parties/' + this.props.newParty._id, {
      title: this.state.mealTitle,
      description: this.state.mealDescription,
    })
    .then((response) => {
      const newMeal = response.data[response.data.length - 1];
      this.setState({
        newMeal: newMeal,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

    event.preventDefault();
  }

  goToRecipeSearch() {
    // this.props.history.push('/recipesearch', {newMeal: this.state.newMeal, newParty: history.location.state.newParty, profile: history.location.state.profile});
    this.setState({
      goToRecipeSearchFlag: true
    });
    this.props.event;
  }

  render(){
    return (
      <div>
      <h2>Make Your First Meal So You Can Add Recipes That Get Voted On</h2>
        <form onSubmit={this.handleMealSubmit.bind(this)}>
          <input type="text" onChange={this.handleMealTitleChange.bind(this)} placeholder="New Meal Title" />
          <input type="text" onChange={this.handleMealDescriptionChange.bind(this)} placeholder="New Meal Description" />
          <input type="submit" value="submit" />
        </form>
      <button onClick={this.goToRecipeSearch.bind(this)}>></button>
        {this.state.goToRecipeSearchFlag && <RecipeSearch newMeal={this.state.newMeal} history={this.props.history} newParty={this.props.newParty} profile={this.props.profile} />}
      </div>
    );
  }
}

export default NewMeal;
