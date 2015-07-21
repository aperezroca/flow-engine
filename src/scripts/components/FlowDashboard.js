import React from 'react';
import FlowStore from 'stores/FlowStore';
import FlowActions from 'actions/FlowActions';
import RuleList from 'RuleList';
import Result from 'Result';
import RuleForm from 'RuleForm';
import ExecutionForm from 'ExecutionForm';

require('dashboard.scss');

export default class FlowDashboard extends React.Component {

  constructor() {
    super();
    this.state = { rules: [], result: [], flowName: '' };
    this._boundHandleFlowChange = this._handleFlowChange.bind(this);
    this._boundHandleFlowExecuted = this._handleFlowExecuted.bind(this);
  }

  componentDidMount() {
    FlowStore.addFlowChangeListener(this._boundHandleFlowChange);
    FlowStore.addFlowExecutedListener(this._boundHandleFlowExecuted);

    if (FlowStore.getFlow() === undefined) {
      this.context.router.transitionTo('home');
    } else {
      this.setState({ flowName: FlowStore.getFlow().name });
    }
  }

  componentWillUnmount() {
    FlowStore.removeFlowChangeListener(this._boundHandleFlowChange);
    FlowStore.removeFlowExecutedListener(this._boundHandleFlowExecuted);
  }

  render() {
    return (
      <div className="dashboard">
        <h1>{this.state.flowName}</h1>
        <div className="dashboard__main-container">
          <div>
            <RuleForm />
            <RuleList rules={this.state.rules}/>
          </div>
          <div>
            <ExecutionForm />
            <Result result={this.state.result}/>
          </div>
        </div>
      </div>
    );
  }

  _handleFlowChange() {
    this.setState({ rules: FlowStore.getRules() });
  }

  _handleFlowExecuted() {
    this.setState({ result: FlowStore.getLastResult() });
  }

  _executeFlow() {
    FlowActions.executeFlow({});
  }
}

FlowDashboard.contextTypes = {
  router: React.PropTypes.func.isRequired
};
