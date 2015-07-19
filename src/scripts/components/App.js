import React from 'react';
import { RouteHandler } from 'react-router';
import FlowStore from 'stores/FlowStore';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { flowName: '' };
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
      <div>
        <h1>{this.state.flowName}</h1>
        <RouteHandler/>
      </div>
    );
  }

  _handleFlowCreate() {
    this.setState({ flowName: FlowStore.getFlow().name });
    this.context.router.transitionTo('dashboard');
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};
