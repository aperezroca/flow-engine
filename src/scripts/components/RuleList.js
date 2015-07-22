import React from 'react/addons';
import Rule from 'Rule';

require('ruleList.scss');

const CSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class RuleList extends React.Component {

  render() {
    const rules = this.props.rules.map(rule => {
      return (
        <li key={rule.id}><Rule rule={rule}/></li>
      );
    });

    return (
      <ul className="rule-list">
        <CSSTransitionGroup transitionName="fade-in">
          {rules}
        </CSSTransitionGroup>
      </ul>
    );
  }
}

RuleList.propTypes = {
  rules: React.PropTypes.array.isRequired
};
