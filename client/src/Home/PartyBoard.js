import React from 'react';
import axios from 'axios';
import history from '../history';

class PartyBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      currentParty: {}
    };
  }

  componentWillMount() {

    axios.get("/api/parties/" + history.location.state.newPartyId)
      .then((response) => {
        const currentParty = response.data;  // set currentParty to response object which is the current party user just created

        // get year, month, and day from sliced up date string because javascript date is big long nasty string
        let currentPartyYear = currentParty.date.slice(0, 4);
        let currentPartyMonth = currentParty.date.slice(5, 7);
        let currentPartyDay = currentParty.date.slice(9, 10);

        // create array of months
        const months = [
          "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"
        ];

        this.setState({
          currentParty: currentParty,
          // currentPartyDate is reformated date using sliced string/variables
          currentPartyDate: months[currentPartyMonth-1] + " " + currentPartyDay + ", " + currentPartyYear
        });
      });
  }


  render(){
    return(
      <div>
        <h1>Current Party</h1>
        <h2>{this.state.currentParty.title}</h2>
        <p className='partyDate'>{this.state.currentPartyDate}</p>
        <p>{this.state.currentParty.description}</p>
      </div>
    );
  }





}

export default PartyBoard;
