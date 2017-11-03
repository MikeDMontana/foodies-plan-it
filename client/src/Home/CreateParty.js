import React from 'react';
import axios from 'axios';
import history from '../history';
import NewMeal from './NewMeal';
import {TweenMax} from 'gsap';
import GSAP from 'react-gsap-enhancer';

class CreateParty extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      partyTitle: "",
      partyDescription: "",
      partyDate: "",
      partyList: [],
      newParty: {},
      goToMealFormFlag: false
    };
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
    axios.post('/api/parties/', {
      title: this.state.partyTitle,
      description: this.state.partyDescription,
      date: this.state.partyDate,
      users: history.location.state.usersArray
    })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('/api/parties')
      .then((response) => {
        const newParty = response.data[response.data.length - 1];
        this.setState({
          newParty: newParty,
        });
      });
      this.setState({goToMealFormFlag: true});
    event.preventDefault();
  }

  goToMealForm() {
    this.props.history.push('/newmeal', {profile: history.location.state.profile, newParty: this.state.newParty});
  }

  // {this.state.goToMealFormFlag && <NewMeal history={this.props.history} profile={this.props.profile} newParty={this.state.newParty} />}

  render() {
    return(
      <div className="homeContainer">
      <div className="homeLeft">
        <h2>Now Create A Party Where You Will All Meet Up!</h2>
        <img src="img/createPartyCompCharacters.png" alt="cartoon food characters, create your party - foodies plan it" />
      </div>
      <div className="homeRight">
        <form className="emailsInputForm createPartyForm" onSubmit={this.handleSubmit.bind(this)}>
          <input className="emailsInputField" type="text" onChange={this.handleTitleChange.bind(this)} placeholder="Your Party Title..." value={this.state.partyTitle}/> <br />
          <input className="emailsInputField" type="text" onChange={this.handleDescriptionChange.bind(this)} placeholder="Your Party Description" value={this.state.partyDescription}/> <br />
          <input className="datesInputField" type="date" onChange={this.handleDateChange.bind(this)} placeholder="The Date Of Your Event" name="Party Date" />
          <input className="createPartySubmit" type="submit" value="SAVE" />
        </form>
        {this.state.goToMealFormFlag && <button className="goToPartyBtn" onClick={this.goToMealForm.bind(this)}>NOW CREATE A MEAL!</button>}
      </div>
      </div>
    );
  }

}

export default CreateParty;
