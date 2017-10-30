import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppIndex from './appIndex.js';
//import SignUp from './components/SignUpPage'
import {configureStore}  from './store/store';
let store = configureStore()
export default store
ReactDOM.render(<Provider store = {store}><div> <AppIndex/></div>
</Provider>, document.getElementById('root'));
