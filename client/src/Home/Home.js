import React, { Component } from 'react';
import CreateParty from './CreateParty';
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
      <div className="homeContainer">
        <div className="homeLeft">
          <h2>Start By Inputting The Emails Of Your Foodie Friends</h2>
          <img src="img/homeCompCharacters.png" alt="cartoon food characters - foodies plan it" />
        </div>
        <div className="homeRight">
          <form className="emailsInputForm" onSubmit={this.handleUserInputSubmit.bind(this)}>
            <input className="emailsInputField" ype="text" onChange={this.handleUserInputChange.bind(this)} placeholder="INPUT FOODIE EMAILS HERE" />
            <input className="emailsInputSubmit" type="submit" value=">"/>
          </form>
          <ul className="userEmailList">
            {this.state.usersArray.map((user, index) =>
                <li className="fa fa-check"><span className="userEmailListItem"> {user}</span></li>
            )}
          </ul>
            {(this.state.usersArray.length > 0) ? <button className="homePartyBtn" onClick={this.goToPartyForm.bind(this)}>GREAT, LETS PLAN A PARTY!</button> : ""}
            {this.state.goToPartyFormFlag && <CreateParty usersArray={this.state.usersArray} profile={this.state.profile} history={this.props.history}/>}
        </div>
      </div>
    );
  }
}

export default Home;
