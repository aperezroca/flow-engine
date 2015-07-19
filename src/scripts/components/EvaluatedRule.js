// React
import React from 'react';

export default class EvaluatedRule extends React.Component {

  render() {
    return (
      <div style={{ backgroundColor: this.props.result ? 'green' : 'red' }}>
        <span>Id: {this.props.rule.id}</span>
      </div>
    );
  }
}

EvaluatedRule.propTypes = {
  rule: React.PropTypes.object.isRequired,
  result: React.PropTypes.bool.isRequired
};
