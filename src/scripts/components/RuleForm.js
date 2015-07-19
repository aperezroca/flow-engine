import React from 'react';
import FlowActions from 'actions/FlowActions';

export default class extends React.Component {

  constructor() {
    super();
    this.state = { id: '', title: '', body: '', trueId: '', falseId: '' };
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <input type="text" name="id" placeholder="Id" value={this.state.id} onChange={this._handlePropChange.bind(this)}/>
        <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this._handlePropChange.bind(this)}/>
        <textarea name="body" placeholder="Body" onChange={this._handlePropChange.bind(this)} value={this.state.body}/>
        <input type="text" name="trueId" placeholder="Rule Id if body returns True" value={this.state.trueId} onChange={this._handlePropChange.bind(this)}/>
        <input type="text" name="falseId" placeholder="Rule Id if body returns False" value={this.state.falseId} onChange={this._handlePropChange.bind(this)}/>
        <input type="submit" value="Create"/>
      </form>
    );
  }

  _handlePropChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();

    FlowActions.addRule({
      id: this.state.id,
      title: this.state.title,
      body: this._evalBody(),
      trueId: this.state.trueId,
      falseId: this.state.falseId
    });

    this._clearForm();
  }

  _clearForm() {
    this.setState({ id: '', name: '', body: '', trueId: '', falseId: '' });
  }

  _evalBody() {
    return this.state.body ? eval('(' + this.state.body + ')') : null; // eslint-disable-line no-eval
  }
}
