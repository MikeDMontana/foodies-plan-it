import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecipeSearch from './RecipeSearch';

class NewMeal extends Component {
  constructor(props) {
    super(props);

    this.state={
      profile: this.props.profile,
      newMeal: "",
      mealTitle: "",
      mealDescription: "",
      onOffFlag: false
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
        onOffFlag: !this.state.onOffFlag
      });
      console.log(this.state.newMeal._id);
    })
    .catch(function (error) {
      console.log(error);
    });

    event.preventDefault();
  }

  render(){
    return (
      <div>
        <h1>Now Create Your First Meal, {this.props.profile.nickname}!</h1>
        <form onSubmit={this.handleMealSubmit.bind(this)}>
          <input type="text" onChange={this.handleMealTitleChange.bind(this)} placeholder="New Meal Title" />
          <input type="text" onChange={this.handleMealDescriptionChange.bind(this)} placeholder="New Meal Description" />
          <input type="submit" value="submit" />
        </form>
        { this.state.onOffFlag && <RecipeSearch newMeal={this.state.newMeal} newParty={this.props.newParty} profile={this.props.profile} history={this.props.history}/> }
      </div>
    );
  }
}

export default NewMeal;
