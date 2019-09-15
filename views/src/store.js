import {createStore, combineReducers, applyMiddleware} from 'redux'
import postReducer from './reducers/post'
import thunk from 'redux-thunk'

export const postState = {
  post:[]
}

const reducers = combineReducers({postReducer})
const store = createStore(reducers, applyMiddleware(thunk))

export default store
