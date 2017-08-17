import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class NewMeal extends Component {
  constructor(props) {
    super(props);

    this.state={
      profile: this.props.profile,
      profileId: this.props.profileId,
      mealTitle: "",
      mealDescription: ""
    };
  }

  handleMealTitleChange(event) {
    const mealTitle = event.target.value;
    this.setState=({
      mealTitle: mealTitle
    });
  }

  handleMealDescriptionChange(event) {
    const mealDescription = event.target.value;
    this.setState=({
      mealDescription: mealDescription
    });
  }

  handleMealSubmit(event) {
    console.log(this.props.profileId);
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
      </div>
    );
  }
}

export default NewMeal;
