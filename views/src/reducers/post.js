import {ADD_POST} from '../actions/post'
import {postState} from '../store'

const postReducer = (state=postState, action)=>{
  if (action.type === ADD_POST) {
    return action.payload
  }
  return state
}

export default postReducer
