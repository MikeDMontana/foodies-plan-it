import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PartyBoard extends Component {
  constructor(props) {
    super(props);

    this.state={
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

  render(){
    return (
      <div>
        <h1>Your Party Board {this.state.profile.nickname}</h1>
      </div>
    );
  }
}

export default PartyBoard;
