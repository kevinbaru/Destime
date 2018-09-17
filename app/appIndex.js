import React from 'react';
import { connect } from 'react-redux';
import MainPage from './components/MainPage';
import SignUp from './components/SignUpPage';
import SignIn from './components/SignInPage';
import EditProfile from './components/editProfile';
import MyProfile from './components/myProfile';
import { Router,browserHistory, Route, Switch, Link } from 'react-router-dom'
import history from './history';



class AppIndex extends React.Component{

  render(){
    return(
      <div>
      <Router history={history}>
        <Switch>
            <Route exact path='/' component={SignIn} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path='/myProfile' component={MyProfile} />
            <Route path='/editProfile' component={EditProfile} />
        </Switch>
     </Router>
   </div>


    )
  }
}
export default AppIndex
