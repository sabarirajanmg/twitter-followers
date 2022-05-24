import { createSelector } from 'reselect';

const getState = state => state.authentication;

const makeLoadingSelector = () => createSelector(getState, state => state.get('loading'));
const makeErrorSelector = () => createSelector(getState, state => state.get('error'));
const makeRequestTokenSelector = () =>
  createSelector(getState, authentication => authentication.get('requestToken'));
const makeRequestTokenSecretSelector = () =>
  createSelector(getState, authentication => authentication.get('requestTokenSecret'));
const makeAccessTokenSelector = () =>
  createSelector(getState, authentication => authentication.get('accessToken'));
const makeAccessTokenSecretSelector = () =>
  createSelector(getState, authentication => authentication.get('accessTokenSecret'));

export {
  makeLoadingSelector,
  makeErrorSelector,
  makeRequestTokenSelector,
  makeRequestTokenSecretSelector,
  makeAccessTokenSelector,
  makeAccessTokenSecretSelector,
};
