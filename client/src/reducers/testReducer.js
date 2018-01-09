import { FETCH_TEST } from '../actions/types';

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_TEST:
      return action.payload;
    default:
      return state;
  }
};
