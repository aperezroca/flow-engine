import React from 'react';
import FlowActions from 'actions/FlowActions';
import ErrorActions from 'actions/ErrorActions';

require('ruleForm.scss');

export default class extends React.Component {

  constructor() {
    super();
    this.state = { id: '', title: '', body: '', trueId: '', falseId: '' };
  }

  render() {
    return (
      <form className="rule-form" onSubmit={this._handleSubmit.bind(this)}>
        <input className="rule-form__input rule-form__input--half" type="text" name="id" placeholder="Id" value={this.state.id} onChange={this._handlePropChange.bind(this)}/>
        <input className="rule-form__input rule-form__input--half" type="text" name="title" placeholder="Title" value={this.state.title} onChange={this._handlePropChange.bind(this)}/>
        <textarea className="rule-form__input rule-form__input--textarea" name="body" placeholder="function() { return true; }" onChange={this._handlePropChange.bind(this)} value={this.state.body}/>
        <input className="rule-form__input rule-form__input--half" type="text" name="trueId" placeholder="Rule if true" value={this.state.trueId} onChange={this._handlePropChange.bind(this)}/>
        <input className="rule-form__input rule-form__input--half" type="text" name="falseId" placeholder="Rule if false" value={this.state.falseId} onChange={this._handlePropChange.bind(this)}/>
        <input type="submit" value="Add rule"/>
      </form>
    );
  }

  _handlePropChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  _handleSubmit(event) {
    let body;

    event.preventDefault();

    try {
      body = this._evalBody();
    } catch(e) {
      ErrorActions.setError('Rule\'s body is not valid');
      return;
    }

    if ((typeof body !== 'function') && (this.state.body !== '')) {
      ErrorActions.setError('Rule\'s body must be a function');
      return;
    } else if (this.state.body === '') {
      body = undefined;
    }

    try {
      FlowActions.addRule({
        id: this.state.id,
        title: this.state.title,
        body: body,
        trueId: this.state.trueId,
        falseId: this.state.falseId
      });
    } catch(e) {
      ErrorActions.setError('The rule is not valid');
      return;
    }

    ErrorActions.discard();
    this._clearForm();
  }

  _clearForm() {
    this.setState({ id: '', name: '', body: '', trueId: '', falseId: '' });
  }

  _evalBody() {
    return this.state.body ? eval('(' + this.state.body + ')') : null; // eslint-disable-line no-eval
  }
}
