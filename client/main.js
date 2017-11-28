import { Meteor } from  'meteor/meteor';
import ReactDom from  'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from './../imports/routes/routes';
import '../imports/startup/simpl-schema-config';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDom.render(routes, document.getElementById('app'));
});
