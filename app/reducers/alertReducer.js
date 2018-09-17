import { SUCCESS, CLEAR, ERROR} from '../actions/alert';
export function alertReducer(state = {
  }, action) {
  switch (action.type) {
    case SUCCESS:
      return Object.assign({}, state, {
      type:'alert-success',
      message:action.message
      })
    case ERROR:
      return Object.assign({}, state, {
       type:'alert-danger',
       message:action.message,
      })
    case CLEAR:
      return Object.assign({}, state, {
        type:undefined,
        message:"",
      })
    default:
      return state
  }
}
