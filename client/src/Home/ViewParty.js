import React from 'react';
import axios from 'axios';


class ViewParty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      allParties: [],
      userParties: [],
    }
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
    axios.get('/api/parties')
    .then((response) => {
      const allParties = response.data;
      const userParties = allParties.filter(party => party.users.includes(this.state.profile.name));

      this.setState({
        userParties: userParties
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <h1>Your Current Party</h1>
        {console.log(this.state.userParties)}
        <ul>
        {this.state.userParties.map((party) =>
          <div>
            <h3>{party.title}</h3>
            <li>{party.description}</li>
            <li>{party.date}</li>
          </div>
        )}
        </ul>
      </div>
    );
  }

}

export default ViewParty;
