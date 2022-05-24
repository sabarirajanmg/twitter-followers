import { all } from 'redux-saga/effects';
import { followersSagas } from './containers/FollowersList/sagas';
import { authenticationSagas } from './containers/Authentication/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    followersSagas(),
    authenticationSagas(),
  ]);
}
