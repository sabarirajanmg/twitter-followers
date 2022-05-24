import types from "./types";

export function setLoading(isLoading) {
  return {
    type: types.SET_LOADING,
    payload: isLoading,
  };
}

export function setError(isError = true) {
  return {
    type: types.SET_ERROR,
    payload: isError,
  };
}

export function setSortedFollowers(sortOrder, followers) {
  return {
    type: types.SET_SORTED_FOLLOWERS,
    payload: {
      sortOrder,
      followers
    },
  };
}

export function toggleSort() {
  return {
    type: types.TOGGLE_SORT,
  };
}

export const getFollowersList = (cursor = -1) => {
  return {
    type: types.GET_FOLLOWERS_LIST,
    payload: cursor,
  };
};

export const setFollowersList = payload => {
  return {
    type: types.SET_FOLLOWERS_LIST,
    payload,
  };
};
