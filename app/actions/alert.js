
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'
export const CLEAR = 'CLEAR'

export function successM(message){
  return{
    type:SUCCESS,
    message
  }
}

export function errorM(message){
  return{
    type:ERROR,
    message
  }
}

export function clearM(){
  return{
    type:CLEAR,
  }
}
