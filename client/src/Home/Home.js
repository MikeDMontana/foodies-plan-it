import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewMeal from './NewMeal';
import GroupUsersSelect from './GroupUsersSelect';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipeImg: {},
      partyTitle: "",
      partyDescription: "",
      partyDate: "",
      partyList: [],
      onOffFlag: false,
      profile: {},
      newParty: {},
      groupUsers: [],
      groupUserId: "",
      usersArray: []
    };
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
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

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  checkBoxClicked(event) {
    const newGroupUser = event.target.value;
    this.state.usersArray.push(newGroupUser);

    this.setState({
      usersArray: this.state.usersArray
    });
    console.log(this.state.usersArray);
  }

  handleTitleChange(event) {
    const partyTitle = event.target.value;
    this.setState({
      partyTitle: partyTitle
    });
  }

  handleDescriptionChange(event) {
    const partyDescription = event.target.value;
    this.setState({
      partyDescription: partyDescription
    });
  }

  handleDateChange(event) {
    const partyDate = event.target.value;
    this.setState({
      partyDate: partyDate
    })
  }

  handleSubmit(event) {
    console.log(this.state.usersArray);
    axios.post('/api/parties/', {
      title: this.state.partyTitle,
      description: this.state.partyDescription,
      date: this.state.partyDate,
      users: this.state.usersArray
    })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('/api/parties')
      .then((response) => {
        const newParty = response.data[response.data.length - 1];
        this.setState({
          newParty: newParty,
          onOffFlag: !this.state.onOffFlag,
        });
        console.log(this.state.newParty._id);
      });
    event.preventDefault();
  }


  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <h1>Foodies Plan.It</h1>
        <p>Hi {this.state.profile.nickname}! <br />
           Please get started by creating a party.</p>
        <ul className="NewPartyForms">
          <li className="PartyForms1">
          <h3>Select Your Team of Foodies</h3>
            <ul>
              {this.state.groupUsers.map((groupUser, index) =>
                <li><button value={groupUser._id} onClick={this.checkBoxClicked.bind(this)}>{groupUser.email}</button></li>
              )}
            </ul>

            <form onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" onChange={this.handleTitleChange.bind(this)} placeholder="Your Party Title..." value={this.state.partyTitle}/>
              <input type="text" onChange={this.handleDescriptionChange.bind(this)} placeholder="Your Party Description" value={this.state.partyDescription}/>
              <input type="date" onChange={this.handleDateChange.bind(this)} name="Party Date" />
              <input type="submit" value="submit" />
            </form>
          </li>
          <li className="PartyForms2">
            <NewMeal profile={this.state.profile} newParty={this.state.newParty} />
          </li>
        </ul>
        <button onClick={this.goTo.bind(this, 'recipesearch')}>SEARCH RECIPES!</button>
      </div>
    );
  }
}

export default Home;
