import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class GroupUsersSelect extends Component {
  constructor(props) {
    super(props);

    this.state={
      profile: this.props.profile,
      groupUsers: [],
      groupUserId: "",
      usersArray: []
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

  checkBoxClicked(event) {
    // When Meal is Submitted Put Meal into the meals model for each user selected
    const newGroupUser = event.target.value;
    this.state.usersArray.push(newGroupUser);

    this.setState({
      usersArray: this.state.usersArray
    });
    console.log(this.state.usersArray);
    event.preventDefault();
  }

  render(){
    return (
      <div>
        <h3>Select Your Team of Foodies</h3>
          <ul>
            {this.state.groupUsers.map((groupUser, index) =>
              <li><button value={groupUser._id} onClick={this.checkBoxClicked.bind(this)}>{groupUser.email}</button></li>
            )}
          </ul>
      </div>
    );
  }
}

export default GroupUsersSelect;
