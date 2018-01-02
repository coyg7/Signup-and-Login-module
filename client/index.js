import React from 'react';
import routes from './routes';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import setAuthorizationToken from './utils/setAuthorizationToken'; 
import { setCurrentUser } from './actions/authActions';
import jwtDecode from 'jwt-decode';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}


ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
  </Provider>, 
  document.getElementById('app')
);