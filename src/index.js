import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import PlanetsIndex from './containers/PlanetsIndex'
import LoginPage from './containers/LoginPage'

import thunk from 'redux-thunk'
import api from './middleware/api'
import reducers from './reducers'
import createHistory from 'history/createBrowserHistory'
import {
  ConnectedRouter as Router,
  routerMiddleware
} from 'react-router-redux'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

const history = createHistory()
const rMiddleware = routerMiddleware(history)

const store = createStore(
  reducers,
  applyMiddleware(thunk, rMiddleware, api)
)


let rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={App}/>
          <Route path="/planets" component={PlanetsIndex}/>
        <Route path="/login" component={LoginPage}/>
      </div>
    </Router>
  </Provider>,
  rootElement
)
