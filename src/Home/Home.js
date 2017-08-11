import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipeImg: {},
      partyTitle: "",
      partyDescription: ""
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
    let config = {"X-Mashape-Key": "thENAA1AsWmshrk3g1Wkjto9yLEcp1l5DdUjsnNgmYe1qsTLC4",
                    "Accept": "application/json"};

    axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=vegetarian%2Cdessert", {headers:config})
      .then((response) => {
        const recipeImg = response.data.recipes[0];
        this.setState({
          recipeImg: recipeImg
        });
      });
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

  handleSubmit(event) {
    // const party = {title:this.state.partyTitle, description:this.state.partyDescription};
    const profileId = this.state.profile.sub.replace('auth0|', '');

    // axios.get("http://localhost:8080/api/users/" + profileId)
    // .then((response) => {
    //   console.log(response);
    // });
    axios({
      method: 'put',
      url: 'http://localhost:8080/api/users/' + profileId,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        title: this.state.partyDescription,
        description: this.state.partyDescription
      }
    });

    event.preventDefault();
  }

  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                You are logged in! You can now view your{' '}
                <Link to="profile">profile area</Link>
                .
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
        <p>{this.state.recipeImg.title}</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" onChange={this.handleTitleChange.bind(this)} placeholder="Your Party Title..." value={this.state.partyTitle}/>
          <input type="text" onChange={this.handleDescriptionChange.bind(this)} placeholder="Your Party Description" value={this.state.partyDescription}/>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default Home;
