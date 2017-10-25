import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import LoginPage from './containers/LoginPage'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api'
import quotesApp from './reducers'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(quotesApp)
const history = syncHistoryWithStore(browserHistory, store)

let rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>

      </Route>
      <Route path="/login" component={LoginPage}/>
    </Router>
  </Provider>,
  rootElement
)
