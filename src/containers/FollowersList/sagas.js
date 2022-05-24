import { put, call, select, takeEvery } from 'redux-saga/effects';
import types from './types';
import { setLoading, setFollowersList, setError, setSortedFollowers } from './actions';
import Twitter from '../../utils/twitterAPI';
import { makeAccessTokenSelector, makeAccessTokenSecretSelector } from '../Authentication/selectors';
import { makeSortSelector, makeFollowersSelector } from './selectors';
// import mockResponse from './__mocks__/followers.json';

// sort followers by name
function sortFollowers(followers, sortOrder) {
  return followers.sort((a, b) => {
    const name1 = a.name.toLowerCase();
    const name2 = b.name.toLowerCase();
    if (name1 < name2) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (name1 > name2) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

export function* getFollowersList(action) {
  yield put(setLoading(true));
  try {
    const accessToken = yield select(makeAccessTokenSelector());
    const accessTokenSecret = yield select(makeAccessTokenSecretSelector());
    const params = {
      count: 8,
      cursor: action.payload
    };
    const jsonResponse = yield call(
      Twitter.getFollowersList,
      params,
      accessToken,
      accessTokenSecret
    );
    let response = JSON.parse(jsonResponse);
    // let response = mockResponse;
    if (response && response.users && response.users.length) {
      const sortOrder = yield select(makeSortSelector());
      response = {
        ...response,
        users: sortFollowers(response.users, sortOrder),
      };
    }
    yield put(setFollowersList(response));
  } catch (ex) {
    yield put(setLoading(false));
    yield put(setError(true));
  }
}

export function* toggleSort() {
  yield put(setLoading(true));
  let sortOrder = yield select(makeSortSelector());
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  let followers = yield select(makeFollowersSelector());
  followers = sortFollowers(followers, sortOrder);
  yield put(setSortedFollowers(sortOrder, followers));
  yield put(setLoading(false));
}

export function* followersSagas() {
  yield takeEvery(types.GET_FOLLOWERS_LIST, getFollowersList);
  yield takeEvery(types.TOGGLE_SORT, toggleSort);
}
