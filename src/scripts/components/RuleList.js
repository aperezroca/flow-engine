import React from 'react';
import Rule from 'Rule';

export default class RuleList extends React.Component {

  render() {
    const rules = this.props.rules.map(rule => {
      return (
        <li><Rule rule={rule}/></li>
      );
    });

    return (
      <ul className="rule-list">
        {rules}
      </ul>
    );
  }
}

RuleList.propTypes = {
  rules: React.PropTypes.array.isRequired
};
