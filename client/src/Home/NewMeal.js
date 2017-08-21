import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class NewMeal extends Component {
  constructor(props) {
    super(props);

    this.state={
      profile: this.props.profile,
      usersArray: this.props.newParty,
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
    axios.put('/api/parties/' + this.props.newParty._id, {
      title: this.state.mealTitle,
      description: this.state.mealDescription,
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
      </div>
    );
  }
}

export default NewMeal;
