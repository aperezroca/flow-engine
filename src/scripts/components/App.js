import React from 'react';
import FlowStore from 'stores/FlowStore';
import FlowActions from 'actions/FlowActions';
import FlowForm from 'FlowForm';
import RuleForm from 'RuleForm';
import ExecutionForm from 'ExecutionForm';
import Rule from 'Rule';
import EvaluatedRule from 'EvaluatedRule';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { currentStep: App.STEP_CREATE_FORM, rules: [], result: [] };
    this._boundHandleFlowChange = this._handleFlowChange.bind(this);
    this._boundHandleFlowExecuted = this._handleFlowExecuted.bind(this);
    this._boundHandleFlowCreate = this._handleFlowCreate.bind(this);
  }

  componentDidMount() {
    FlowStore.addFlowCreateListener(this._boundHandleFlowCreate);
    FlowStore.addFlowChangeListener(this._boundHandleFlowChange);
    FlowStore.addFlowExecutedListener(this._boundHandleFlowExecuted);
  }

  componentWillUnmount() {
    FlowStore.removeFlowCreateListener(this._boundHandleFlowCreate);
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
        <h1>Flow</h1>
        {this._getCurrentStep()}
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

  _handleFlowCreate() {
    this.setState({ currentStep: App.STEP_ADD_RULE });
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

  _getCurrentStep() {
    return {
      [App.STEP_CREATE_FORM]: <FlowForm/>,
      [App.STEP_ADD_RULE]: <RuleForm/>
    }[this.state.currentStep];
  }
}

App.STEP_CREATE_FORM = Symbol();
App.STEP_ADD_RULE = Symbol();
