import React, { Component } from 'react';
import axios from 'axios';

class RecipeSearch extends Component {
  constructor(props) {
    super(props);

    this.state={
      profile: this.props.profile,
      profileId: this.props.profileId,

    };
  }

  render() {
    return (
      <div>
        <h2>Hello from Course</h2>
      </div>
    );
  }

}

export default RecipeSearch;
