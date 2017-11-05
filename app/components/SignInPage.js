import React from 'react';
import GoogleLogin from 'react-google-login';
import {Proptypes} from 'react';
import { connect } from 'react-redux';
import styles from '../../stylesheets/SignUp.css'
import auth from '../config/auth.js'
import {loginUser, loginLinkedin, loginFacebook,loginGoogle} from '../actions/login';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state ={user: {username:"", password:""},
               submitted:false}
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this)
  this.handleGoogleFail = this.handleGoogleFail.bind(this)
  }


 handleChange(event) {
      const { name, value } = event.target;
      const { user } = this.state;
      this.setState({
          user: {
              ...user,
              [name]: value
          }
      });
  }
 handleSubmit(event){
   console.log('dhdhdhhdh')
   event.preventDefault();
   const {user} = this.state;
   const { dispatch } = this.props;
   this.setState({submitted:true});
   if( user.username && user.password ){
     console.log('jamaicaaaa')
     dispatch(loginUser(user))
   }
 }
  // User entered valid google login credentials. Proceed to verification action
  handleGoogleSuccess(creds) {
    const { dispatch } = this.props;
    dispatch(loginGoogle(creds));
}

  // User did not enter valid google login credentials. Log the response in the console 
  handleGoogleFail(response) {
    console.log("Failed");
    console.log(response);
}

  render() {
    const { isFetching  } = this.props;
    const { user, submitted } = this.state;


    return(
    <div className="container">
            <div className="header">
              <img id = "logo" src = {require('./../../images/logo.png')}  alt = "Destime"/>
          <div className="title-container">
            <div className="main-title">SIGN IN</div>

          </div>
            </div>
              <div className="inner-container social">
                  <div className="inner-inner-container">
                    <button onClick={()=>onfb()} className="social-button facebook">Facebook</button>
                    <button onClick={()=>onLn()} className="social-button linkedin">LinkedIn</button>
                    <button onClick={()=>onTw()} className="social-button twitter">Twitter</button>
                    {/* React component for google authentication. Will make a popup window that
                        user can use to login with their google account. If the credentials are valid,
                        proceed to handleGoogleSuccess function, else go to handleGoogleFail function */}
                    <GoogleLogin className="social-button google" clientId={auth.googleClientID} buttonText="Google" onSuccess={this.handleGoogleSuccess} onFailure={this.handleGoogleFail}/>
                  </div>
              </div>
              <div>
                  <p className="or-container"><span className="or">or</span></p>
              </div>
            <div className="inner-container form">
                  <div className="inner-inner-container">
                  <input name = "fullname" onChange={this.handleChange} name = "username" value =  {user.usernname} placeholder="NICKNAME" type="text" className="form-input" required/>
                  <input placeholder="PASSWORD" onChange = {this.handleChange} name = "password" value ={user.password} type="password" className="form-input" required/>
                      <button id="signin-button" onClick = {this.handleSubmit}>SIGN IN</button>
                  </div>
            </div>
          </div>
        )}

      }
      const mapStateToProps = (state) => {
        return {
            registering: state.signUp.isRegistering,
            errors:state.signUp.errorMessage

        };
    };

    // const mapDispatchToProps = (dispatch) => {
    //     return {
    //          onfb:() => dispatch(LoginFacebook()),
    //          ontw:() => dispatch(LoginTwitter()),
    //          onLn:() => dispatch(LoginLinkedIn()),
    //          onGgl:() => dispatch(LoginGoogle()),
    //     };
    // };
    //export default SignUp
    export default connect(
        mapStateToProps,
    )(SignIn);
