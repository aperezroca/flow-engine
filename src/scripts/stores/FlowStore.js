import { Rule, Flow } from 'lib/FlowLib';
import FlowConstants from 'constants/FlowConstants';
import AppDispatcher from 'dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

let _flow;
let _lastResult;

function _createFlow(name) {
  _flow = new Flow(name);
}

function _addRule(ruleProperties) {
  _flow.addRule(new Rule(ruleProperties));
}

function _executeFlow(input) {
  _lastResult = _flow.execute(input);
}

class FlowStore extends EventEmitter {

  // Getters
  getFlow() {
    return _flow;
  }

  getLastResult() {
    return _lastResult;
  }

  // Event handling
  emitFlowChange() {
    this.emit(FlowConstants.Events.FLOW_CHANGE);
  }

  emitFlowExecuted() {
    this.emit(FlowConstants.Events.FLOW_EXECUTED);
  }

  addFlowChangeListener(callback) {
    this.on(FlowConstants.Events.FLOW_CHANGE, callback);
  }

  removeFlowChangeListener(callback) {
    this.removeListener(FlowConstants.Events.FLOW_CHANGE, callback);
  }

  addFlowExecutedListener(callback) {
    this.on(FlowConstants.Events.FLOW_EXECUTED, callback);
  }

  removeFlowExecutedListener(callback) {
    this.removeListener(FlowConstants.Events.FLOW_EXECUTED, callback);
  }
}

let flowStore = new FlowStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case FlowConstants.ActionTypes.CREATE_FLOW:
      _createFlow(action.name);
      flowStore.emitFlowChange();
      break;

    case FlowConstants.ActionTypes.ADD_RULE:
      _addRule(action.properties);
      flowStore.emitFlowChange();
      break;

    case FlowConstants.ActionTypes.EXECUTE_FLOW:
      _executeFlow(action.input);
      flowStore.emitFlowExecuted();
      break;

    default:
      break;
  }
});

export default flowStore;
