import axios from 'axios';
import history from '../history'
import {successM,errorM,clearM} from './alert'

export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const EDITP_FAILURE = 'EDITP_FAILURE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

function receiveProfile(profile) {
  return {
    type: EDITP_SUCCESS,
    profile
  }
}

function updateUser(profile) {
  return {
    type: UPDATE_PROFILE,
    profile
  }
}

function profileError(message) {
  return {
    type: EDITP_FAILURE,
    message
  }
}

export function editProfile(creds) {
  console.log('prifile changed',creds)
  return dispatch => {
    axios.post('http://localhost:3000/profile/' + creds._id, {
      creds:creds.mainInfo,
      token:localStorage.getItem('id_token'),
    })
      .then(profile =>  {
        if (!profile.data.success) {
          console.log('failedddd to edit profileeeee',profile)
          dispatch(errorM('Update Failed. Try again!'))
          setTimeout(function(){
            dispatch(clearM())
          },5000)
          return Promise.reject(profile)
        } else {
          dispatch(updateUser(creds))
          history.push('/myProfile')
          dispatch(successM(' Successfully Saved the profile!'))
          setTimeout(function(){
            dispatch(clearM())
          },5000)
        }
      }).catch(err => {
        console.log("Error: ", err)

      })
  }
}


export function addSkill(creds) {
  return dispatch => {
    dispatch(updateUser(creds.profile))
    axios.post('http://localhost:3000/addskill/' + creds.profile._id, {
      section:creds.section,
      entry:creds[creds.section],
      token:localStorage.getItem('id_token'),
    })
      .then(profile =>  {
        if (!profile.data.success) {
          console.log(profile)
          dispatch(profileError(profile.data.error))
          return Promise.reject(profile)
        } else {
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function editPr(creds) {
  console.log('creddds',creds)
  return dispatch => {
    dispatch(updateUser(creds.profile))
      axios.post('http://localhost:3000/edit' + creds.section + '/' + creds.profile._id, {
        section:creds.section,
        entry:creds[creds.section],
        token:localStorage.getItem('id_token'),
      })
      .then(profile =>  {
        if (!profile.data.success) {
          console.log(profile)
          dispatch(errorM('Update Failed. Try again!'))
          setTimeout(function(){
            dispatch(clearM())
          },5000)
          return Promise.reject(profile)
        } else {

        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function addPr(creds) {
  console.log('creddds',creds)
  return dispatch => {
    dispatch(updateUser(creds.profile))
      axios.post('http://localhost:3000/add' + creds.section + '/' + creds.profile._id, {
        section:creds.section,
        entry:creds[creds.section],
        token:localStorage.getItem('id_token'),
      })
      .then(profile =>  {
        if (!profile.data.success) {
          console.log(profile)
          dispatch(errorM('Update Failed. Try again!'))
          setTimeout(function(){
            dispatch(clearM())
          },5000)
          return Promise.reject(profile)
        } else {

        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function deletePr(creds) {

  return dispatch => {
    dispatch(updateUser(creds.profile))
      axios.post('http://localhost:3000/delete' + creds.section + '/' + creds.profile._id, {
        section:creds.section,
        entry:creds[creds.section],
        token:localStorage.getItem('id_token'),
      })
      .then(profile =>  {
        if (!profile.data.success) {
          console.log(profile)
          dispatch(errorM('Update Failed. Try again!'))
          setTimeout(function(){
            dispatch(clearM())
          },5000)
          dispatch(profileError(profile.data.error))
          return Promise.reject(profile)
        } else {

        }
      }).catch(err => console.log("Error: ", err))

  }
}
