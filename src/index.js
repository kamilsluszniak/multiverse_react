import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api'
import quotesApp from './reducers'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(quotesApp)

let rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)