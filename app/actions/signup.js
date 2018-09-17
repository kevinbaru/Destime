import history from '../history'
import axios from 'axios'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'




function requestSIGNUP(creds) {
  return {
    type: SIGNUP_REQUEST,
    creds}
  }
function receiveSIGNUP(user) {
  return {
    type: SIGNUP_SUCCESS,
     user
  }
}

function SIGNUPError(message,errors) {
  return {
    type: SIGNUP_FAILURE,
    message,
    errors,
  }
}
export function signUpTwitter(){
  return dispatch => {
    // We dispatch requestSIGNUP to kickoff the call to the API
    dispatch(requestSIGNUP(creds))

    return fetch('http://localhost:3000/auth/Twitter')
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.success) {
          // If there was a problem, we want to

          // dispatch the error condition
          dispatch(SIGNUPError(user.message))
          return Promise.reject(user)
        } else {
          // If SIGNUP was successful redirect the user to the sign in Page

          // Dispatch the success action
          dispatch(receiveSIGNUP(user))
          history.push('/login')
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function signUpFacebook(){
  return dispatch => {
    // We dispatch requestSIGNUP to kickoff the call to the API
    dispatch(requestSIGNUP(creds))

    return fetch('http://localhost:3000/auth/Facebook')
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.success) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(SIGNUPError(user.message))
          return Promise.reject(user)
        } else {
          // If SIGNUP was successful redirect the user to the sign in Page

          // Dispatch the success action
          dispatch(receiveSIGNUP(user))
          history.push('/login')
        }
      }).catch(err => console.log("Error: ", err))
  }

}

export function signUpLinkedin(){
  return dispatch => {
    // We dispatch requestSIGNUP to kickoff the call to the API
    dispatch(requestSIGNUP(creds))

    return fetch('http://localhost:3000/auth/Linkedin')
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.success) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(SIGNUPError(user.message))
          return Promise.reject(user)
        } else {
          // If SIGNUP was successful redirect the user to the sign in Page

          // Dispatch the success action
          dispatch(receiveSIGNUP(user))
          history.push('/login')
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function signUpGoogle(){
  return dispatch => {
    // We dispatch requestSIGNUP to kickoff the call to the API
    dispatch(requestSIGNUP())

    return fetch('http://localhost:3000/login')
    .then(response => {console.log(response);

   })
    //.then( response => {console.log(response)})
    // .then( response => {
    //     if (!response.success) {
    //       // If there was a problem, we want to
    //       // dispatch the error condition
    //       dispatch(SIGNUPError(response.message,response.errors))
    //       Promise.reject(response)
    //     } else {
    //       // If SIGNUP was successful redirect the user to the sign in Page
    //
    //       // Dispatch the success action
    //       dispatch(receiveSIGNUP())
    //       history.push('/login')
    //     }
    //   })
      .catch(err => console.log("Error: ", err))

}
}

export function signUpUser(creds) {

  let config = {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        name: creds.fullname,
        firstname:creds.firstname,
        lastname:creds.lastname,
        username: creds.email,
        password:creds.password,
        passwordRepeat:creds.passwordRepeat,
      })
    }

  let b={
    name: creds.fullname,
    firstname:creds.firstname,
    lastname:creds.lastname,
    username: creds.email,
    password:creds.password,
    passwordRepeat:creds.passwordRepeat,
      }

  return dispatch => {

    // We dispatch requestSIGNUP to kickoff the call to the API
    dispatch(requestSIGNUP(creds))


    return axios.post('http://localhost:3000/signup', b)
    // return fetch('http://localhost:3000/signup', config)
    // .then(response => response.json())
    .then( response => {
        if (!response.data.success) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(SIGNUPError(response.data.message,response.data.summary))
          Promise.reject(response)
        } else {
          // If SIGNUP was successful redirect the user to the sign in Page

          // Dispatch the success action
          dispatch(receiveSIGNUP())
          history.push('/login')
        }
      })
      .catch(err => console.log("Error: ", err))
  }


}
