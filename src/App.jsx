/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFoud';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={Login}
          />
          <Route
            exact
            path="/search"
            component={Search}
          />
          <Route
            exact
            path="/album/:id"
            render={(props) => <Album {...props} />}
          />
          <Route
            exact
            path="/favorites"
            component={Favorites}
          />
          <Route
            exact
            path="/profile"
            component={Profile}
          />
          <Route
            exact
            path="/profile/edit"
            component={ProfileEdit}
          />
          <Route
            exact
            component={NotFound}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
