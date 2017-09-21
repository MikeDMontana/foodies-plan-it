import React from 'react';
import axios from 'axios';
import history from '../history';

class PartyBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      viewBoardFlag: this.props.viewBoardFlag
    };
  }

  render(){
    return(
      <div>
        <h1>Current Party</h1>
        {console.log(history.location.state.userName)}
      </div>
    );
  }





}

export default PartyBoard;
