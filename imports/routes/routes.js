import { Meteor } from  'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashbord from '../ui/Dashbord';
import NotFound from '../ui/NotFound';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

//pages you can see without login
const unauthenticatedPages = ['/', '/signup'];
//pages you need to be logged in to see
const authenticatedPages = ['/dashbord'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  //checks whether our page is in authenticatedPages or unauthenticatedPages
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/dashbord');
  }
  else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => {
        return !Meteor.userId() ? <Login /> : <Redirect to="/dashbord" />
      }} />
      <Route path="/signup" render={() => {
        return !Meteor.userId() ? <Signup /> : <Redirect to="/dashbord" />
      }} />
      <Route path="/dashbord" render={() => {
        return Meteor.userId() ? <Dashbord /> : <Redirect to="/" />
      }} />
     <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
