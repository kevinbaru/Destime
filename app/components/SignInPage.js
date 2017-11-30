import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {Proptypes} from 'react';
import { connect } from 'react-redux';
import styles from '../../stylesheets/SignUp.css'
import auth from '../config/auth.js'
import SocialButton from './SocialButton'
import { OldSocialLogin as SocialLogin } from 'react-social-login'
import LinkedIn from 'react-linkedin-login'
import {loginUser, loginLinkedin, loginFb,loginGoogle} from '../actions/login';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state ={user: {username:"", password:""},
               submitted:false}
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this)
  this.handleFacebookSuccess = this.handleFacebookSuccess.bind(this)
  this.handleLinkedIn = this.handleLinkedIn.bind(this)
  this.handleSocialMediaFail = this.handleSocialMediaFail.bind(this)
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
  handleGoogleSuccess(googleAuth) {
    const { dispatch } = this.props;
    dispatch(loginGoogle(googleAuth));
}

  // User entered valid facebook login credentials. Proceed to verification action
  handleFacebookSuccess(fbAuth) {
    const { dispatch } = this.props;
    dispatch(loginFb(fbAuth));
}

  //User entered valid linkedin login credentials. Proceed to verification action
  handleLinkedIn() {
    var authWin = window.open('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77a0gjc8r9c5g0&redirect_uri=http://localhost:3000/auth/linkedin&state=DCEeFWf45A53sdfKef424&scope=r_basicprofile','popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes' );
  }

  // User did not enter valid login credentials. Log the response in the console 
  handleSocialMediaFail(response) {
    console.log("Failed");

    
}

  componentDidMount() {
    window.addEventListener("message", function(e) {
      if(e.origin == 'http://localhost:3000') {
        console.log(e.data);
    }
    }, false);
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
                    {/* <button onClick={()=>onfb()} className="social-button facebook">Facebook</button> */}
                    <FacebookLogin cssClass="social-button facebook" textButton = "Facebook" appId={auth.fbClientID} callback={this.handleFacebookSuccess} onFailure={this.handleSocialMediaFail} />
                    {/* <LinkedIn className="social-button linkedin" clientId={auth.linkedinClientID} callback={this.handleLinkedInSuccess} text='LinkedIn' /> */}
                    <button onClick={this.handleLinkedIn} className="social-button linkedin">LinkedIn</button>
                    {/* <SocialButton className="social-button google" provider='google' appId={auth.googleClientID} onLoginSuccess={this.handleLinkedIn} onLoginFailure={this.handleSocialMediaFail} onLogoutSuccess={this.handleSocialMediaFail}> LinkedIn </SocialButton> */}
                    {/* <SocialLogin className="social-button linkedin" provider='linkedin' appId='77a0gjc8r9c5g0' callback={this.handleLinkedInSuccess} > LinkedIn </SocialLogin> */}
                    <button onClick={()=>onTw()} className="social-button twitter">Twitter</button>
                    {/* React component for google authentication. Will make a popup window that
                        user can use to login with their google account. If the credentials are valid,
                        proceed to handleGoogleSuccess function, else go to handleSocialMediaFail function */}
                    <GoogleLogin className="social-button google" clientId={auth.googleClientID} buttonText="Google" onSuccess={this.handleGoogleSuccess} onFailure={this.handleSocialMediaFail}/>
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
