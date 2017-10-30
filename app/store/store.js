
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middleware = routerMiddleware(history);


export function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware( middleware,thunkMiddleware)
  )
};
