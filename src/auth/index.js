// URL and endpoint constants
const API_URL = 'http://localhost:8000/'
// const LOGIN_URL = API_URL + 'sessions/create/'
const LOGIN_URL = API_URL + 'o/token/'
// const SIGNUP_URL = API_URL + 'users/'
const TOKEN_STRING = 'access_token'

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, {
      emulateJSON: true
    }).then((response) => {
      window.localStorage.setItem(TOKEN_STRING, response.body.access_token)
      this.user.authenticated = true

      // Redirect to a specified route
      if (redirect) {
        context.$router.replace(redirect)
      }
    }, (response) => {
      // error callback
      context.error = response.statusText
    })
  },

  // To log out, we just need to remove the token
  logout (context, redirect) {
    window.localStorage.removeItem(TOKEN_STRING)
    this.user.authenticated = false
    context.$router.replace(redirect)
  },

  checkAuth () {
    var token = window.localStorage.getItem(TOKEN_STRING)
    if (token) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  setToken (token) {
    window.localStorage.setItem(TOKEN_STRING, token)
  },

  getToken () {
    return window.localStorage.getItem(TOKEN_STRING)
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': ('Bearer ' + this.getToken())
    }
  }
}
