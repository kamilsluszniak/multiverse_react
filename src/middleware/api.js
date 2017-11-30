const BASE_URL = 'http://localhost:3001/'

function callApi(endpoint, params) {

  let token = localStorage.getItem('access_token') || null
  let client = localStorage.getItem('client') || null
  let uid = localStorage.getItem('uid') || null
  let expiry = localStorage.getItem('access_token_expire_at') || null
  let config = {}
  let time = Date.now()/1000;
  let token_valid = time < expiry ? true : false

  console.log("token: " + token)
  console.log("client: " + client)
  console.log("uid: " + uid)
  if(token && token_valid) {
    if(token) {
      config = {
        headers: { 'access-token': `${token}`,
                    'client': `${client}`,
                    'uid': `${uid}`}
      }
    }
    else {
      throw "No token saved!"
    }
  }
  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text().then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(new Error(text))
      }
      else{
        console.log(response.headers.get('access-token'))
        console.log(response.headers.get('client'))
        console.log(response.headers.get('uid'))
        localStorage.setItem('access_token', response.headers.get('access-token'))
      }
      return text
    })
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types } = callAPI

  const [ successType, errorType ] = types
  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint).then(
    response =>
      next({
        response,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}
