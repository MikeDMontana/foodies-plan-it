import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewMeal from './NewMeal';

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
      newParty: [],
      profileId: ""
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
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
    console.log(route);
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
    const profileId = this.state.profile.sub.replace('auth0|', '');

    axios.put('/api/users/' + profileId, {
      title: this.state.partyTitle,
      description: this.state.partyDescription,
      date: this.state.partyDate
    })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('/api/users/' + profileId)
      .then((response) => {
        const newParty = response.data.parties[response.data.parties.length - 1];
        this.setState({
          newParty: newParty,
          onOffFlag: !this.state.onOffFlag,
          profileId: profileId
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
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" onChange={this.handleTitleChange.bind(this)} placeholder="Your Party Title..." value={this.state.partyTitle}/>
              <input type="text" onChange={this.handleDescriptionChange.bind(this)} placeholder="Your Party Description" value={this.state.partyDescription}/>
              <input type="date" onChange={this.handleDateChange.bind(this)} name="Party Date" />
              <input type="submit" value="submit" />
            </form>
          </li>
          <li className="PartyForms2">
            <NewMeal profile={this.state.profile} profileId={this.state.profileId}/>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
