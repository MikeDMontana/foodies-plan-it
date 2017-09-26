import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecipeSearch from './RecipeSearch';
import history from '../history';


class NewMeal extends Component {
  constructor(props) {
    super(props);

    this.state={
      profile: this.props.profile,
      history: this.props.history,
      newMeal: "",
      mealTitle: "",
      mealDescription: "",
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
    event.preventDefault();

    axios.put('/api/parties/' + this.props.newParty._id, {
      title: this.state.mealTitle,
      description: this.state.mealDescription,
    })
    .then((response) => {
      const newMeal = response.data[response.data.length - 1];
      this.setState({
        newMeal: newMeal,
      });
      console.log(this.state.newMeal._id);
    })
    .catch(function (error) {
      console.log(error);
    });

    this.goToRecipeSearch();
  }

  goToRecipeSearch() {
    this.props.history.push('/recipesearch', {newMeal: this.state.newMeal, newParty: history.location.state.newParty, profile: this.props.profile, history:this.props.history});
  }

  render(){
    return (
      <div>
      {console.log(history.location.state.newParty)}
      {console.log(this.props.profile)}

      <h2>Make Your First Meal So You Can Add Recipes That Get Voted On</h2>
        <form onSubmit={this.handleMealSubmit.bind(this)}>
          <input type="text" onChange={this.handleMealTitleChange.bind(this)} placeholder="New Meal Title" />
          <input type="text" onChange={this.handleMealDescriptionChange.bind(this)} placeholder="New Meal Description" />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default NewMeal;
