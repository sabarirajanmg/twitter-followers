import createReducer from "../reducers";
import store from "../store";

export default function injectAsyncReducer(name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
