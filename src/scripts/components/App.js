import React from 'react';
import { RouteHandler } from 'react-router';
import FlowStore from 'stores/FlowStore';

require('app.scss');

export default class App extends React.Component {

  constructor() {
    super();
    this._boundHandleFlowCreate = this._handleFlowCreate.bind(this);
  }

  componentDidMount() {
    FlowStore.addFlowCreateListener(this._boundHandleFlowCreate);
  }

  componentWillUnmount() {
    FlowStore.removeFlowCreateListener(this._boundHandleFlowCreate);
  }

  render() {
    return (
      <div className="app">
        <RouteHandler/>
      </div>
    );
  }

  _handleFlowCreate() {
    this.context.router.transitionTo('dashboard');
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};
