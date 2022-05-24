import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
// to polyfill ECMAScript features
import 'core-js/stable';
// to use transpiled generator functions
import 'regenerator-runtime/runtime';

import store, { history } from 'store';
import FollowersList from 'containers/FollowersList';
import Authentication from 'containers/Authentication';
import TwitterCallback from 'containers/Authentication/TwitterCallback';
import NavBar from 'components/NavBar';
import NotFound from 'components/NotFound';

// bootstrap resources
import 'jquery/dist/jquery.min';
import 'popper.js/dist/esm/popper.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/index.scss';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/callback" component={TwitterCallback} />
            <Route exact path="/home" component={FollowersList} />
            <Route path="/not-found" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

render(<App />, document.getElementById('root'));
