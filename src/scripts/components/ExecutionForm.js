import React from 'react';
import FlowActions from 'actions/FlowActions';
import ErrorActions from 'actions/ErrorActions';

require('executionForm.scss');

export default class ExecutionForm extends React.Component {

  constructor() {
    super();
    this.state = { inputObject: '{}' };
  }

  render() {
    return (
      <form className="execution-form" onSubmit={this._handleSubmit.bind(this)}>
        <textarea className="execution-form__input" value={this.state.inputObject} onChange={this._handleChange.bind(this)}/>
        <input type="submit" value="Execute"/>
      </form>
    );
  }

  _handleChange(event) {
    this.setState({ inputObject: event.target.value });
  }

  _handleSubmit(event) {
    let input;

    event.preventDefault();

    try {
      input = eval('(' + this.state.inputObject + ')'); // eslint-disable-line no-eval
    } catch(e) {
      ErrorActions.setError('The input object is not valid');
    }

    FlowActions.executeFlow(input);
  }
}
