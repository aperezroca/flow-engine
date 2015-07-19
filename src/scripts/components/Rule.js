// React
import React from 'react';

export default class Rule extends React.Component {

  render() {
    return (
      <div style={{ border: '1px solid black', padding: 5 }}>
        <span>Id: {this.props.rule.id}</span>
        <span>Title: {this.props.rule.title}</span>
        <span>True: {this.props.rule.trueId}</span>
        <span>False: {this.props.rule.falseId}</span>
      </div>
    );
  }
}

Rule.propTypes = {
  rule: React.PropTypes.object.isRequired
};
