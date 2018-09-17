import history from '../history';
import createAppStore  from '../store/store';
import {successM,errorM,clearM} from './alert'
const {store, persistor} = createAppStore();

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

// Logs the user out
export function logoutUser() {

  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout());
    persistor.purge();
    dispatch(clearM());
    history.push('/login')
  }
}
