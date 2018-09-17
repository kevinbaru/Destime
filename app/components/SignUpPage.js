import React from 'react';
import {connect} from 'react-redux';
import styles1 from '../../stylesheets/SignUp.css';
import {signUpUser, signUpLinkedin, signUpFacebook,signUpGoogle} from '../actions/signup';
import { Router, Route} from 'react-router';
import { Link } from 'react-router-dom'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state ={user: {fullname:"",firstname:"",lastname:"" ,email:"", password:"", passwordRepeat:""},
               submitted:false,
               passwordDontMatch:false,
               pass:false,
               emailG:false,
             }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleGoogle = this.handleGoogle.bind(this)
  }


 handleChange(event) {
      const { name, value } = event.target;

      let { user, passwordDontMatch,pass,emailG } = this.state;
      this.setState({
          user: {
              ...user,
              [name]: value
          }
      });


    if( name === "passwordRepeat" && value!== this.state.user.password){
      this.setState({passwordDontMatch:true})
    }
    if( name === "passwordRepeat" && value === this.state.user.password){
      this.setState({passwordDontMatch:false})
    }

    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if(name === "password" && re.test(value)) {

       this.setState({pass:true})
     }
     if(name === "password" && !re.test(value)) {

        this.setState({pass:false})
      }


    const eml = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    if(name === "email" && eml.test(value)) {

       this.setState({emailG:true})
     }
     if(name === "email" && !eml.test(value)) {

        this.setState({emailG:false})
      }

  }
 handleSubmit(event){
   event.preventDefault();
   const {user, passwordDontMatch,pass,emailG} = this.state;
   const { dispatch } = this.props;
   this.setState({submitted:true});
   if(user.fullname && user.email && user.firstname && user.lastname && pass && user.passwordRepeat && !passwordDontMatch && emailG){
     dispatch(signUpUser(user))
   }

 }

 handleGoogle(event){


   const { dispatch } = this.props;
   dispatch(signUpGoogle())
 }

  render() {
    const { registering, errorSummary, errors  } = this.props;
    const { user, submitted,pass, passwordDontMatch,emailG } = this.state;


    return (

      <div className="container">
        <div className="header">
        	<img id = "logo" src = {require('./../../images/logo.png')} alt = "Destime"/>
				<div className="title-container">
					<div className="main-title">SIGN UP</div>
				</div>
       </div>

            <div className="inner-container social">
              {errorSummary && <p className="my-notify-error">{errorSummary}</p>}
                <div className="inner-inner-container">
                    <button onClick={()=>onfb()} className="social-button facebook">Facebook</button>
                    <button onClick={()=>onLn()} className="social-button linkedin">LinkedIn</button>
                    <button onClick={()=>onTw()} className="social-button twitter">Twitter</button>
                    <button  className="social-button google"  onClick = {this.handleGoogle}> Google</button>
                </div>
            </div>
            <div>
                <p className="or-container"><span className="or">or</span></p>
            </div>
        	<div className="inner-container form">

                <div className="inner-inner-container">
            		<input placeholder="FULL NAME" type="text" name = "fullname" value ={user.fullname} onChange = {this.handleChange} className=  { errors && errors.name? "form-input invalid":"form-input"} required/>
                {errors && errors.fullname ? <div className = "error-placeholder" > {errors.name?errors.name:""}</div>:<div></div>}
                {submitted && !user.fullname? <div className = "error-placeholder" > Fullname is required </div>:<div></div>}

                <input placeholder="FIRST NAME" type="text" name = "firstname" value ={user.firstname} onChange = {this.handleChange} className=  { errors && errors.firstname? "form-input invalid":"form-input"} required/>
                {submitted && !user.firstname? <div className = "error-placeholder" > First name is required </div>:<div></div>}

                <input placeholder="LAST NAME" type="text" name = "lastname" value ={user.lastname} onChange = {this.handleChange} className=  { errors && errors.lastname? "form-input invalid":"form-input"} required/>
                {submitted && !user.lastname? <div className = "error-placeholder" > Last name is required </div>:<div></div>}

            		<input placeholder="EMAIL ADDRESS" type="email" name = "email" value ={user.email} onChange = {this.handleChange} className=  { errors && errors.username? "form-input invalid":"form-input"} required/>
                  {errors && errors.username? <div className = "error-placeholder" > {errors.username?errors.username:""}</div>:<div></div>}
                  {(submitted && !user.email) || (user.email && !emailG)? <div className = "error-placeholder" > Valid email is required </div>:<div></div>}


            		<input placeholder="PASSWORD" type="password" name= "password" value ={user.password} onChange = {this.handleChange} className=  { errors && errors.password? "form-input invalid":"form-input"} required />
                {errors && errors.password? <div className = "error-placeholder" > {errors.password}</div>:<div></div>}
                {user.password && !pass? <div className = "error-placeholder" > Password should contain at least: 6 characters, one numeric, one uppercase and one lowercase </div>:<div></div>}
                {submitted && !user.password? <div className = "error-placeholder" > Password is required </div>:<div></div>}

            		<input placeholder="RE-ENTER PASSWORD" type="password" name ="passwordRepeat" value ={user.passwordRepeat} onChange = {this.handleChange} className =  { errors && errors.passwordRepeat? "form-input invalid":"form-input"} required/>
                {errors && errors.passwordRepeat? <div className = "error-placeholder" > {errors.passwordRepeat? errors.passwordRepeat:""}</div>:<div></div>}
                {submitted && !user.passwordRepeat? <div className = "error-placeholder" > Repeat Password is required </div>:<div></div>}
                {user.passwordRepeat && passwordDontMatch? <div className = "error-placeholder" > Password does not match </div>:<div></div>}
                {/*
                <input placeholder="TELEPHONE NUMBER" type="text" val ={this.state.fullname} onChange = {this.handleChange(phone).bind(this)} className="form-input"/>
            		<input placeholder="PROFESSION" type="text" val = {this.state.profession} className="form-input"/>
            		<div className="double-input-container">
            			<input placeholder="DATE OF BIRTH" type="text" val= {this.state.dob} className="double-input" required/>
            			<input placeholder="GENDER" type="text"  val ={this.state.gender} className="double-input right-input"/>
            		</div>
            		<div className="double-input-container last-container">
            			<input placeholder="UNIVERSITY" type="text" val ={this.state.university} className="double-input"/>
            			<input placeholder="COURSE" type="text" val = {this.state.course} className="double-input right-input"/>
            		</div>
            		<input placeholder="CITY" type="text" val = {this.state.city} className="form-input"/>
            		<textarea placeholder="TELL US ABOUT YOURSELF" val = {this.state.info} name="about" className="form-input" id="about-input" cols="30" rows="10"></textarea>
            		<button id="upload-button">UPLOAD YOUR PROFILE PICTURE</button> */}
                <button id="signup-button" onClick={this.handleSubmit}>REGISTER </button>
                <div className = "alternative">Already have an account? <Link to={'/login'}>Log in</Link></div>

                </div>
           </div>

        </div>

    )}
  }

  const mapStateToProps = (state) => {
    return {
        registering: state.signUp.isRegistering,
        errorSummary:state.signUp.errorMessage,
        errors:state.signUp.errors

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        // onfb:() => dispatch(signUpFacebook()),
        // ontw:() => dispatch(signUpTwitter()),
        // onLn:() => dispatch(signUpLinkedin()),
        // onGgl:() => dispatch(signUpGoogle()),
    };
};
//export default SignUp
export default connect(
    mapStateToProps
)(SignUp);
