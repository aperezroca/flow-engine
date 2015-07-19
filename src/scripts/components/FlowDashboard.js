import React from 'react';
import FlowStore from 'stores/FlowStore';
import FlowActions from 'actions/FlowActions';
import Rule from 'Rule';
import EvaluatedRule from 'EvaluatedRule';
import RuleForm from 'RuleForm';
import ExecutionForm from 'ExecutionForm';

export default class FlowDashboard extends React.Component {

  constructor() {
    super();
    this.state = { rules: [], result: [] };
    this._boundHandleFlowChange = this._handleFlowChange.bind(this);
    this._boundHandleFlowExecuted = this._handleFlowExecuted.bind(this);
  }

  componentDidMount() {
    FlowStore.addFlowChangeListener(this._boundHandleFlowChange);
    FlowStore.addFlowExecutedListener(this._boundHandleFlowExecuted);

    if (FlowStore.getFlow() === undefined) {
      this.context.router.transitionTo('home');
    }
  }

  componentWillUnmount() {
    FlowStore.removeFlowChangeListener(this._boundHandleFlowChange);
    FlowStore.removeFlowExecutedListener(this._boundHandleFlowExecuted);
  }

  render() {
    const rules = this.state.rules.map(rule => {
      return (
        <li key={rule.id}>
          <Rule rule={rule}/>
        </li>
      );
    });

    const result = this.state.result.map(rule => {
      return (
        <li key={rule.rule.id}>
          <EvaluatedRule rule={rule.rule} result={rule.result}/>
        </li>
      );
    });

    return (
      <div>
        <RuleForm />
        <ExecutionForm />
        <ul>
          {rules}
        </ul>
        <ul>
          {result}
        </ul>
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
