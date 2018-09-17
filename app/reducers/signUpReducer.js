import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../actions/signup'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function signUpReducer(state = {
    isRegistering: false,
    isSignedUp: false,
  }, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isRegistering: true,
        isSignedUp: false,
        user: action.creds
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isRegistering: false,
        isSignedUp: true,
        errorMessage: ''
      })
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isRegistering: false,
        isSignedUp: false,
        errorMessage: action.message,
        errors:action.errors
      })

    default:
      return state
  }
}
export default signUpReducer
