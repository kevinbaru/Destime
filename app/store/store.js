
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = routerMiddleware(history);


const createAppStore= () =>{
  let store = createStore(
    persistedReducer,
    applyMiddleware( middleware,thunkMiddleware)
  )
  let persistor = persistStore(store)
  return {store, persistor}
};

export default createAppStore;
