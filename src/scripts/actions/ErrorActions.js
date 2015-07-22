import AppDispatcher from 'dispatcher/AppDispatcher';
import ErrorConstants from 'constants/ErrorConstants';

export default class ErrorActions {

  static setError(text) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.ActionTypes.SET_ERROR,
      text: text
    });
  }

  static discard() {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.ActionTypes.DISCARD_ERROR
    });
  }
}
