import React from 'react';
import routes from './routes';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
  </Provider>, 
  document.getElementById('app')
);