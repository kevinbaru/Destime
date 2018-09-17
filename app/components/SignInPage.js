import React from 'react';
import {Proptypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import styles from '../../stylesheets/SignUp.css'
import {loginUser, LoginLinkedin, LoginFacebook,LoginGoogle} from '../actions/login';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state ={user: {username:"", password:""},
               submitted:false}
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleGoogle = this.handleGoogle.bind(this)

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
   event.preventDefault();
   const {user} = this.state;
   const { dispatch } = this.props;
   this.setState({submitted:true});
   if( user.username && user.password ){
     dispatch(loginUser(user))
   }

 }

 handleGoogle(event){
   event.preventDefault()
   const { dispatch } = this.props;
   dispatch(signUpGoogle)
 }
  render() {
    const { isFetching,isSignedUp, errorMessage  } = this.props;
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
                {isSignedUp && <p className="my-notify-success"> Registration was successful</p>}
                {errorMessage && <p className="my-notify-error">{errorMessage}</p>}
                  <div className="inner-inner-container">
                    <button onClick={()=>onfb()} className="social-button facebook">Facebook</button>
                    <button onClick={()=>onLn()} className="social-button linkedin">LinkedIn</button>
                    <button onClick={()=>onTw()} className="social-button twitter">Twitter</button>
                    <button  onClick={this.handleGoogle} className="social-button google">Google</button>
                  </div>
              </div>
              <div>
                  <p className="or-container"><span className="or">or</span></p>
              </div>
            <div className="inner-container form">
                  <div className="inner-inner-container">
                  <input name = "fullname" onChange={this.handleChange} name = "username" value =  {user.username} placeholder="USERNAME" type="text" className="form-input" required/>
                  {submitted && !user.username? <div className = "error-placeholder" > Username is required </div>:<div></div>}
                  <input placeholder="PASSWORD" onChange = {this.handleChange} name = "password" value ={user.password} type="password" className="form-input" required/>
                  {submitted && !user.password? <div className = "error-placeholder" > Password is required </div>:<div></div>}
                      <button id="signin-button" onClick = {this.handleSubmit}>SIGN IN</button>
                        <div className = "alternative">Don't have an account? <Link to={'/signup'}>Create one</Link></div>
                  </div>
            </div>
          </div>
        )}

      }
      const mapStateToProps = (state) => {
        return {
            isSignedUp: state.signUp.isSignedUp,
            errorMessage:state.signIn.errorMessage
        };
    };

    // const mapDispatchToProps = (dispatch) => {
    //     return {
    //         onfb:() => dispatch(LoginFacebook()),
    //         ontw:() => dispatch(LoginTwitter()),
    //         onLn:() => dispatch(LoginLinkedIn()),
    //         onGgl:() => dispatch(LoginGoogle()),
    //     };
    // };
    //export default SignUp
    export default connect(
        mapStateToProps,
    )(SignIn);
