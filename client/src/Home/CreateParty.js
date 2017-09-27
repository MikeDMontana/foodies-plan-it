import React from 'react';
import axios from 'axios';
import NewMeal from './NewMeal';
import { Link } from 'react-router-dom';
import history from '../history';


class CreateParty extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      profile: this.props.profile,
      partyTitle: "",
      partyDescription: "",
      partyDate: "",
      partyList: [],
      newParty: {}
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
    event.preventDefault();
  }

  goToMealForm() {
    this.props.history.push('/newmeal', {profile: this.props.profile, newParty: this.state.newParty});
  }


  render() {
    return(
      <div>
        <h2>Now Create A Party Where You Will All Meet Up!</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" onChange={this.handleTitleChange.bind(this)} placeholder="Your Party Title..." value={this.state.partyTitle}/>
          <input type="text" onChange={this.handleDescriptionChange.bind(this)} placeholder="Your Party Description" value={this.state.partyDescription}/>
          <input type="date" onChange={this.handleDateChange.bind(this)} name="Party Date" />
          <input type="submit" value="submit" />
        </form>
        <button onClick={this.goToMealForm.bind(this)}>></button>
      </div>
    );
  }

}

export default CreateParty;
