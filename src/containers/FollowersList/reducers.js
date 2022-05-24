import { fromJS } from "immutable";
import types from "./types";

// initial state for the reducer
const initialState = fromJS({
  loading: false,
  error: false,
  sort: 'asc',
  list: [],
  previousCursor: 0,
  nextCursor: 0,
});

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case types.SET_FOLLOWERS_LIST:
      return state
        .set('list', fromJS(payload.users))
        .set('previousCursor', payload.previous_cursor)
        .set('nextCursor', payload.next_cursor)
        .set('error', false)
        .set('loading', false);
    case types.SET_LOADING:
      return state.set('loading', payload);
    case types.SET_ERROR:
      return state.set('error', payload);
    case types.SET_SORTED_FOLLOWERS:
      return state
        .set('list', fromJS(payload.followers))
        .set('sort', payload.sortOrder);
    default:
      return state;
  }
}
