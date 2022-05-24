import { compose, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from 'history';
import { routerMiddleware } from "connected-react-router";
import createReducer from "./reducers";
import rootSaga from "./sagas";

const initialState = {};
const enhancers = [];

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

// include all middleware
const middleWares = [
  sagaMiddleware,
  routerMiddleware(history)
];

// add redux dev tools extension for development purpose
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const composedEnhancers = compose(
  applyMiddleware(...middleWares),
  ...enhancers
);

const store = createStore(
  createReducer(history),
  initialState,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export default store;
