/* eslint-disable camelcase */
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import types from './types';
import { setLoading, setAccessToken, setError } from './actions';
import Twitter from '../../utils/twitterAPI';

// get request token for redirecting user to twitter login page
export function* getRequestToken() {
  yield put(setLoading(true));
  try {
    const { token, token_secret } = yield call(Twitter.getOAuthRequestToken);
    localStorage.setItem('requestToken', token);
    localStorage.setItem('requestTokenSecret', token_secret);
    window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`
  } catch (ex) {
    yield put(setError(true));
  } finally {
    yield put(setLoading(false));
  }
}

// get access token from twitter API using oauth_verifier id
export function* getAccessToken(action) {
  yield put(setLoading(true));
  try {
    const requestToken = localStorage.getItem('requestToken');
    const requestTokenSecret = localStorage.getItem('requestTokenSecret');
    const response = yield call(
      Twitter.getOAuthAccessToken,
      requestToken,
      requestTokenSecret,
      action.payload
    );
    yield put(setAccessToken(response));
    yield put(push('/home'));
  } catch (ex) {
    yield put(setError(true));
  } finally {
    yield put(setLoading(false));
  }
}

export function* authenticationSagas() {
  yield takeLatest(types.GET_REQUEST_TOKEN, getRequestToken);
  yield takeLatest(types.GET_ACCESS_TOKEN, getAccessToken);
}
