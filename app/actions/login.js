import history from '../history';
import axios from 'axios';


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'




function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    creds}
  }
function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message
  }
}

export function loginUser(creds) {

  let config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: creds.username,
        password:creds.password,
      })
    }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    //return fetch('http://localhost:3000/login', config)
    axios.post('http://localhost:3000/login',{
      username: creds.username,
      password:creds.password,
    })
      //.then(response =>response.json())
      .then(res =>  {
        console.log(res,'logiiin')
        if (!res.data.success) {
          // If there was a problem, we want to
          // dispatch the error condition
          console.log(' Failed to  logiiin',res.data)
          dispatch(loginError(res.data.error))
          return Promise.reject(res)
        } else {
          console.log(res.data)
          // If login was successful, set the token in local storage

          localStorage.setItem('id_token',res.data.token )



          // Dispatch the success action
          dispatch(receiveLogin(res.data.profile))

          history.push('/myProfile')

        }
      }).catch(err => console.log("Error: ", err))
  }
}

// export function loginFb(creds) {
//
//   return dispatch => {
//     // We dispatch requestLogin to kickoff the call to the API
//     dispatch(requestLogin(creds))
//
//     return fetch('http://localhost:3000/auth/fb')
//       .then(response =>
//         response.json().then(user => ({ user, response }))
//             ).then(({ user, response }) =>  {
//         if (!response.success) {
//           // If there was a problem, we want to
//           // dispatch the error condition
//           dispatch(loginError(user.message))
//           return Promise.reject(user)
//         } else {
//           // If login was successful, set the token in local storage
//           localStorage.setItem('id_token', user.id_token)
//           localStorage.setItem('id_token', user.access_token)
//           // Dispatch the success action
//           dispatch(receiveLogin(user))
//
//         }
//       }).catch(err => console.log("Error: ", err))
//   }
// }
//
// export function loginTwitter(creds) {
//
//   return dispatch => {
//     // We dispatch requestLogin to kickoff the call to the API
//     dispatch(requestLogin(creds))
//
//     return fetch('http://localhost:3000/auth/twitter')
//       .then(response =>
//         response.json().then(user => ({ user, response }))
//             ).then(({ user, response }) =>  {
//         if (!response.success) {
//           // If there was a problem, we want to
//           // dispatch the error condition
//           dispatch(loginError(user.message))
//           return Promise.reject(user)
//         } else {
//           // If login was successful, set the token in local storage
//           localStorage.setItem('id_token', user.id_token)
//           localStorage.setItem('id_token', user.access_token)
//           // Dispatch the success action
//           dispatch(receiveLogin(user))
//
//         }
//       }).catch(err => console.log("Error: ", err))
//   }
// }
//
// export function loginGoogle(creds) {
//
//   return dispatch => {
//     // We dispatch requestLogin to kickoff the call to the API
//     dispatch(requestLogin(creds))
//
//     return fetch('http://localhost:3000/auth/google')
//       .then(response =>
//         response.json().then(user => ({ user, response }))
//             ).then(({ user, response }) =>  {
//         if (!response.success) {
//           // If there was a problem, we want to
//           // dispatch the error condition
//           dispatch(loginError(user.message))
//           return Promise.reject(user)
//         } else {
//           // If login was successful, set the token in local storage
//           localStorage.setItem('id_token', user.id_token)
//           localStorage.setItem('id_token', user.access_token)
//           // Dispatch the success action
//           dispatch(receiveLogin(user))
//
//         }
//       }).catch(err => console.log("Error: ", err))
//   }
// }
//
// export function loginLinkedIn(creds) {
//   return dispatch => {
//     // We dispatch requestLogin to kickoff the call to the API
//     dispatch(requestLogin(creds))
//
//     return fetch('http://localhost:3000/auth/LinkedIn')
//       .then(response =>
//         response.json().then(user => ({ user, response }))
//             ).then(({ user, response }) =>  {
//         if (!response.success) {
//           // If there was a problem, we want to
//           // dispatch the error condition
//           dispatch(loginError(user.message))
//           return Promise.reject(user)
//         } else {
//           // If login was successful, set the token in local storage
//           localStorage.setItem('id_token', user.id_token)
//           localStorage.setItem('id_token', user.access_token)
//           // Dispatch the success action
//           dispatch(receiveLogin(user))
//
//         }
//       }).catch(err => console.log("Error: ", err))
//   }
// }
