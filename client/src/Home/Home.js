import React, { Component } from 'react';
import CreateParty from './CreateParty';
import {TweenMax} from 'gsap';
import GSAP from 'react-gsap-enhancer';
import history from '../history';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipeImg: {},
      profile: {},
      newGroupUser: "",
      usersArray: [],
      goToPartyFormFlag: false
    };
  }


  // get users profile
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

  // handle change of foodie email input
  handleUserInputChange(event) {
    const newGroupUser = event.target.value;
    this.setState({
      newGroupUser: newGroupUser
    });
  }

  // save list of foodies that get input
  handleUserInputSubmit(event) {
    this.state.usersArray.push(this.state.newGroupUser);

    this.setState({
      usersArray: this.state.usersArray
    });
    event.preventDefault();
  }

  goToPartyForm() {
    // this.props.history.push('/createParty', {usersArray: this.state.usersArray, profile: this.state.profile});
    this.setState({
      goToPartyFormFlag: true
    });
  }


  render() {
    //const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <h1>Foodies Plan.It</h1>
        <p>Hi {this.state.profile.nickname}! <br />
           Please get started by creating a party.</p>
        <form onSubmit={this.handleUserInputSubmit.bind(this)}>
          <input type="text" onChange={this.handleUserInputChange.bind(this)} placeholder="INPUT FOODIE EMAILS HERE   >" />
          <input type="submit" value=">"/>
        </form>
        <ul>
          {this.state.usersArray.map((user, index) =>
              <li>{user}</li>
          )}
        </ul>
        <button onClick={this.goToPartyForm.bind(this)}>GREAT, LETS PLAN A PARTY!</button>
          {this.state.goToPartyFormFlag && <CreateParty usersArray={this.state.usersArray} profile={this.state.profile} history={this.props.history}/>}
      </div>
    );
  }
}

export default Home;
