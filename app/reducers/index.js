import { combineReducers } from 'redux';
import {signUpReducer} from  './signUpReducer';
import {authReducer} from './loginReducer';
import {alertReducer} from './alertReducer';


const rootReducer = combineReducers({

    signIn: authReducer,
    signUp: signUpReducer,
    alert:alertReducer,
});

export default rootReducer;
