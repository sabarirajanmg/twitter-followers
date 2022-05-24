import { fromJS } from "immutable";
import types from "./types";

// initial state for the reducer
const initialState = fromJS({
  loading: false,
  error: false,
  accessToken: '1148000822-9JkMbcbUtj9e3yyf3muxoxbS5kqeaqaUhhuohD6',
  accessTokenSecret: 'IOi9vyXmcmw5cXS5CH1wl74E55sxS0Mya8z42zF8TCVBO',
  requestToken: '',
  requestTokenSecret: '',
});

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case types.SET_REQUEST_TOKEN:
      return state
        .set('requestToken', payload.token)
        .set('requestTokenSecret', payload.token_secret);
    case types.SET_ACEESS_TOKEN:
      // eslint-disable-next-line no-case-declarations
      const [oauthAccessToken, oauthAccessTokenSecret] = payload;
      return state
        .set('accessToken', oauthAccessToken)
        .set('accessTokenSecret', oauthAccessTokenSecret);
    case types.SET_LOADING:
      return state.set('loading', payload);
    case types.SET_ERROR:
      return state.set('error', payload);
    default:
      return state;
  }
}
