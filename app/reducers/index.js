import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import {signUpReducer} from  './signUpReducer'
import {authReducer} from './loginReducer'



const rootReducer = combineReducers({

    signIn: authReducer,
    signUp: signUpReducer,
    routing: routerReducer // this reducer is used by React Router in Redux
});

export default rootReducer;
