
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../actions/login'


import {
  EDITP_SUCCESS, EDITP_FAILURE, UPDATE_PROFILE
} from '../actions/profile'

import  {LOGOUT_SUCCESS} from '../actions/logout'
// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function authReducer(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        profile: action.user
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        profile:action.user,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        profile:{}
      })

      case EDITP_SUCCESS:
        return Object.assign({}, state, {
          profile:action.profile,
          errorMessage: ''
        })

        case UPDATE_PROFILE:
          return Object.assign({}, state, {
            errorMessage: action.message,
            profile:action.profile,
          })

       case EDITP_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.message
        })

    default:
      return state
  }
}
