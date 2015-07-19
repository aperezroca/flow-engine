import AppDispatcher from 'dispatcher/AppDispatcher';
import FlowConstants from 'constants/FlowConstants';

export default class AccountActions {

  static createFlow(name) {
    AppDispatcher.dispatch({
      actionType: FlowConstants.ActionTypes.CREATE_FLOW,
      name: name
    });
  }

  static addRule(properties) {
    AppDispatcher.dispatch({
      actionType: FlowConstants.ActionTypes.ADD_RULE,
      properties: properties
    });
  }

  static executeFlow(input) {
    AppDispatcher.dispatch({
      actionType: FlowConstants.ActionTypes.EXECUTE_FLOW,
      input: input
    });
  }
}
