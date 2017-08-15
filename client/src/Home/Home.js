import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipeImg: {},
      partyTitle: "",
      partyDescription: "",
      partyDate: "",
      partyList: [],
      partyListFlag: false
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
    // let config = {"X-Mashape-Key": "thENAA1AsWmshrk3g1Wkjto9yLEcp1l5DdUjsnNgmYe1qsTLC4",
    //                 "Accept": "application/json"};
    //
    // axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=vegetarian%2Cdessert", {headers:config})
    //   .then((response) => {
    //     const recipeImg = response.data.recipes[0];
    //     this.setState({
    //       recipeImg: recipeImg
    //     });
    //   });
  }

  partiesBtnClicked(event) {
    const profileId = this.state.profile.sub.replace('auth0|', '');

    axios.get('/api/users/' + profileId)
      .then((response) => {
        const partyList = response.data.parties;
        this.setState({
          partyList: partyList
        });
      });

      this.setState({
        partyListFlag: !this.state.partyListFlag
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
        <h1>Foodies Plan.It</h1>
        <p>Hi {this.state.profile.nickname}! <br />
           Please get started by creating a party.</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" onChange={this.handleTitleChange.bind(this)} placeholder="Your Party Title..." value={this.state.partyTitle}/>
          <input type="text" onChange={this.handleDescriptionChange.bind(this)} placeholder="Your Party Description" value={this.state.partyDescription}/>
          <input type="date" onChange={this.handleDateChange.bind(this)} name="Party Date" />
          <input type="submit" value="submit" />
        </form>
        <button onClick={this.partiesBtnClicked.bind(this)}>VIEW PARTIES</button>
        {this.state.partyListFlag && this.state.partyList.map((party) =>
            <p>{party.title}</p>
        )}
      </div>
    );
  }
}

export default Home;
