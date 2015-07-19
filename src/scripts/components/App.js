import React from 'react';
import FlowStore from 'stores/FlowStore';
import FlowActions from 'actions/FlowActions';
import Flow from 'Flow';

export default class App extends React.Component {

  constructor() {
    super();
    this._boundHandleFlowChange = this._handleFlowChange.bind(this);
    this._boundHandleFlowExecuted = this._handleFlowExecuted.bind(this);
  }

  componentDidMount() {
    FlowStore.addFlowChangeListener(this._boundHandleFlowChange);
    FlowStore.addFlowExecutedListener(this._boundHandleFlowExecuted);
  }

  componentWillUnmount() {
    FlowStore.removeFlowChangeListener(this._boundHandleFlowChange);
    FlowStore.removeFlowExecutedListener(this._boundHandleFlowExecuted);
  }

  render() {
    return (
      <div>
        <h1>Flow</h1>
        <Flow />
        <button onClick={this._addRule.bind(this)}>Add rule</button>
        <button onClick={this._executeFlow.bind(this)}>Execute flow</button>
      </div>
    );
  }

  _handleFlowChange() {
    console.log(FlowStore.getFlow());
  }

  _handleFlowExecuted() {
    console.log(FlowStore.getLastResult());
  }

  _addRule() {
    FlowActions.addRule({ id: 1 });
  }

  _executeFlow() {
    FlowActions.executeFlow({});
  }
}
