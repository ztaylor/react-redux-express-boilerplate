import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import test from './testReducer';

const rootReducer = combineReducers({
  form,
  test,
});

export default rootReducer;
