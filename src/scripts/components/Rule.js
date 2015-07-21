import React from 'react';
import classnames from 'classnames';

require('rule.scss');

export default class Rule extends React.Component {

  render() {
    const ruleClassnames = classnames({
      'rule': true,
      'rule--true': this.props.result === true,
      'rule--false': this.props.result === false
    });

    return (
      <div className={ruleClassnames}>
        <span className="rule__id">{this.props.rule.id}</span>
        <span className="rule__title">{this.props.rule.title}</span>
        <span className="rule__false-id">{this.props.rule.falseId}</span>
        <span className="rule__true-id">{this.props.rule.trueId}</span>
      </div>
    );
  }
}

Rule.propTypes = {
  rule: React.PropTypes.object.isRequired,
  result: React.PropTypes.bool
};
