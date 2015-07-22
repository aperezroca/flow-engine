import React from 'react';
import { RouteHandler } from 'react-router';
import FlowStore from 'stores/FlowStore';
import ErrorStore from 'stores/ErrorStore';
import classnames from 'classnames';

require('app.scss');

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { error: '' };
    this._boundHandleFlowCreate = this._handleFlowCreate.bind(this);
    this._boundHandleErrorChange = this._handleErrorChange.bind(this);
  }

  componentDidMount() {
    FlowStore.addFlowCreateListener(this._boundHandleFlowCreate);
    ErrorStore.addErrorChangeListener(this._boundHandleErrorChange);
  }

  componentWillUnmount() {
    FlowStore.removeFlowCreateListener(this._boundHandleFlowCreate);
    ErrorStore.removeErrorChangeListener(this._boundHandleErrorChange);
  }

  render() {
    const errorClassnames = classnames({
      'app__error': true,
      'app__error--visible': this.state.error !== ''
    });

    return (
      <div className="app">
        <div className={errorClassnames}>{this.state.error}</div>
        <RouteHandler/>
      </div>
    );
  }

  _handleFlowCreate() {
    this.context.router.transitionTo('dashboard');
  }

  _handleErrorChange() {
    this.setState({ error: ErrorStore.getText() });
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};
