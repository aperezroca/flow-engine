import React from 'react/addons';
import Rule from 'Rule';

require('ruleList.scss');

const CSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class RuleList extends React.Component {

  render() {
    const result = this.props.result.map(rule => {
      return (
        <li><Rule rule={rule.rule} result={rule.result}/></li>
      );
    });

    return (
      <ul className="rule-list">
        <CSSTransitionGroup transitionName="fade-in">
          {result}
        </CSSTransitionGroup>
      </ul>
    );
  }
}

RuleList.propTypes = {
  result: React.PropTypes.array.isRequired
};
