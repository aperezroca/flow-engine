import React from 'react';
import { default as Router, Route,
         DefaultRoute, HistoryLocation } from 'react-router';
import App from 'App';
import FlowForm from 'FlowForm';
import FlowDashboard from 'FlowDashboard';

require('vendor/normalize.css');
require('defaults.scss');

const content = document.getElementById('content');

const routes = (
  <Route path="/" name="home" handler={App}>
    <DefaultRoute handler={FlowForm}/>
    <Route path="/dashboard" name="dashboard" handler={FlowDashboard}/>
  </Route>
);

Router.run(routes, HistoryLocation,
  (Handler) => React.render(<Handler/>, content));
