// Dispatcher
import AppDispatcher from 'dispatcher/AppDispatcher';

// Utils
import { EventEmitter } from 'events';

// Constants
import ErrorConstants from 'constants/ErrorConstants';

let _text = '';

function _setError(text) {
  _text = text;
}

function _discard() {
  _text = '';
}

class ErrorStore extends EventEmitter {

  getText() {
    return _text;
  }

  emitErrorChange() {
    this.emit(ErrorConstants.Events.ERROR_CHANGE);
  }

  addErrorChangeListener(callback) {
    this.on(ErrorConstants.Events.ERROR_CHANGE, callback);
  }

  removeErrorChangeListener(callback) {
    this.removeListener(ErrorConstants.Events.ERROR_CHANGE, callback);
  }
}

let errorStore = new ErrorStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ErrorConstants.ActionTypes.SET_ERROR:
      _setError(action.text);
      errorStore.emitErrorChange();
      break;
    case ErrorConstants.ActionTypes.DISCARD_ERROR:
      _discard();
      errorStore.emitErrorChange();
      break;
    default:
      break;
  }
});

export default errorStore;
