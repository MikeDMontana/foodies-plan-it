import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import NewMeal from './Home/NewMeal';
import RecipeSearch from './Home/RecipeSearch';
import Profile from './Profile/Profile';
import ViewParty from './Home/ViewParty';
import CreateParty from './Home/CreateParty';
import PartyBoard from './Home/PartyBoard';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home key="home" auth={auth} {...props} />} />
          <Route path="/newmeal" render={(props) => <NewMeal key="newmeal" auth={auth} {...props} />} />
          <Route path="/viewparty" render={(props) => <ViewParty key="viewparty" auth={auth} {...props} />} />
          <Route path="/partyboard" render={(props) => <PartyBoard key="partyboard" auth={auth} {...props} />} />
          <Route path="/createParty" render={(props) => <CreateParty key="createparty" auth={auth} {...props} />} />
          <Route path="/recipesearch" render={(props) => <RecipeSearch key="recipesearch" auth={auth} {...props} />} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
      </Router>
  );
}
