/**
 * Reducers
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import followersReducer from './containers/FollowersList/reducers';
import authenticationReducer from './containers/Authentication/reducer';

const staticReducers = {
  authentication: authenticationReducer,
  followers: followersReducer,
};

// Combine Reducers
export default (history, asyncReducers) => combineReducers({
  router: connectRouter(history),
  ...staticReducers,
  ...asyncReducers,
});
