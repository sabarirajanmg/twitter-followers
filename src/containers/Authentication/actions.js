/* Authentication actions */

import types from './types';

export function setLoading(isLoading) {
  return {
    type: types.SET_LOADING,
    payload: isLoading,
  };
}

export function setError(isError) {
  return {
    type: types.SET_ERROR,
    payload: isError,
  };
}

export function getRequestToken() {
  return {
    type: types.GET_REQUEST_TOKEN,
  };
}

export function setRequestToken(payload) {
  return {
    type: types.SET_REQUEST_TOKEN,
    payload,
  };
}

// get access token with oauth verifier
export function getAccessToken(oauthVerifier) {
  return {
    type: types.GET_ACCESS_TOKEN,
    payload: oauthVerifier,
  };
}

// set acces token and access token verifier
export function setAccessToken([accessToken, accessTokenVerifier]) {
  return {
    type: types.SET_ACCESS_TOKEN,
    payload: {
      accessToken,
      accessTokenVerifier,
    },
  };
}
