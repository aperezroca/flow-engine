let FlowConstants = { ActionTypes: {}, Events: {} };

// Events
FlowConstants.Events.FLOW_CHANGE = Symbol();
FlowConstants.Events.FLOW_EXECUTED = Symbol();

// Action types
FlowConstants.ActionTypes.CREATE_FLOW = Symbol();
FlowConstants.ActionTypes.ADD_RULE = Symbol();
FlowConstants.ActionTypes.EXECUTE_FLOW = Symbol();

export default FlowConstants;
