import React from 'react';
import FlowActions from 'actions/FlowActions';

require('flowForm.scss');

export default class extends React.Component {

  constructor() {
    super();
    this.state = { name: '' };
  }

  render() {
    return (
      <form className="flow-form" onSubmit={this._handleSubmit.bind(this)}>
        <input className="flow-form__input" type="text" placeholder="Name" value={this.state.name} onChange={this._handleNameChange.bind(this)}/>
        <input className="flow-form__button" type="submit" value="Create"/>
      </form>
    );
  }

  _handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    FlowActions.createFlow(this.state.name);
  }
}
