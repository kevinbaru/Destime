import React from 'react';
import { connect } from 'react-redux';
import MainPage from './components/MainPage';
import SignUp from './components/SignUpPage';
import SignIn from './components/SignInPage';
import { Router, Route } from 'react-router';
//import {HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import history from './history';



class AppIndex extends React.Component{

  render(){
    return(
      <div>
      <Router history={history}>
       {/* <Switch>
         <Route exact path="/" component={MainPage} />
         <Route exact path="/signup" component={SignUp} />
         <Route exact path="/login" component={SignIn} />
        <Route exact path="/home" component={MainPage} />
      </Switch> */}

        <div>
            <Route exact path='/' component={MainPage} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </div>

     </Router>
   </div>


    )
  }
}
export default AppIndex
