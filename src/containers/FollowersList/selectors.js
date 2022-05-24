import { createSelector } from 'reselect';

const getState = state => state.followers;

const makeFollowersSelector = () => createSelector(getState, state => state.get('list').toJS());
const makeLoadingSelector = () => createSelector(getState, state => state.get('loading'));
const makeErrorSelector = () => createSelector(getState, state => state.get('error'));
const makeSortSelector = () => createSelector(getState, state => state.get('sort'));
const makePrevCusrorSelector = () => createSelector(getState, state => state.get('previousCursor'));
const makeNextCursorSelector = () => createSelector(getState, state => state.get('nextCursor'));

export {
  makeFollowersSelector,
  makeLoadingSelector,
  makeErrorSelector,
  makeSortSelector,
  makePrevCusrorSelector,
  makeNextCursorSelector,
};
