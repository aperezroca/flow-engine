import React from 'react';
import FlowActions from 'actions/FlowActions';

export default class ExecutionForm extends React.Component {

  constructor() {
    super();
    this.state = { inputObject: '{}' };
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <textarea value={this.state.inputObject} onChange={this._handleChange.bind(this)}/>
        <input type="submit" value="Execute"/>
      </form>
    );
  }

  _handleChange(event) {
    this.setState({ inputObject: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    FlowActions.executeFlow(eval('(' + this.state.inputObject + ')')); // eslint-disable-line no-eval
  }
}
