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
      mealDescription: "",
      groupUsers: [],
      groupUserId: ""
    };
  }

  componentDidMount() {
    axios.get('/api/users')
      .then((response) => {
        const groupUsers = response.data;
        this.setState({
          groupUsers: groupUsers
        });
      });
  }

  handleMealGroupUsers(event) {
    const groupUserId = event.target.value;
    this.setState = ({
      groupUserId: groupUserId
    });
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
          <label className='controlLabel'>Choose Your Board</label>
            <select className='formControl' value={this.state.groupUserId} onChange={this.handleMealGroupUsers.bind(this)}>
              {this.state.groupUsers.map((groupUser, index) =>
                <option value={groupUser._id}>{groupUser.email}</option>
              )}
            </select>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default NewMeal;
