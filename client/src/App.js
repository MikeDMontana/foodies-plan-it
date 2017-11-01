import React, { Component } from 'react';

class App extends Component {

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

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state;

    return (
      <div className="fullPageContainer">
        <div className="navBarContainer">
          <a href="#" alt="Learn About The Developer">ABOUT</a>
          <img src="img/logo.png" alt="foodies plan it logo" />
          <div className="navDropdown">
            <img className="navProfilePic" alt="Click for more options" src={profile.picture} />
            <div className="navDropdownContent">
              <button className="navBtn" onClick={this.goTo.bind(this, 'home')}>
                Home
              </button>
              {
                !isAuthenticated() && (
                    <button className="navBtn"
                      onClick={this.login.bind(this)}
                    >
                      Log In
                    </button>
                  )
              }
              {
                isAuthenticated() && (
                    <button className="navBtn"
                      onClick={this.goTo.bind(this, 'profile')}
                    >
                      Profile
                    </button>
                  )
              }
              {
                isAuthenticated() && (
                    <button className="navBtn"
                      onClick={this.logout.bind(this)}
                    >
                      Log Out
                    </button>
                  )
              }
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
