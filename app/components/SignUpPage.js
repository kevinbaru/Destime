import React from 'react';
import {connect} from 'react-redux';
import styles from '../../stylesheets/SignUp.css';
import {signUpUser, signUpLinkedin, signUpFacebook,signUpGoogle} from '../actions/signup';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state ={user: {fullname:"", email:"", password:"", passwordRepeat:""},
               submitted:false}
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
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
   if(user.fullname && user.email && user.password && user.passwordRepeat){
     dispatch(signUpUser(user))
   }

 }
  render() {
    const { registering  } = this.props;
    const { user, submitted } = this.state;
    return (

      <div className="container">
        <div className="header">
        	<img id = "logo" src = {require('./../../images/logo.png')}  alt = "Destime"/>
				<div className="title-container">
					<div className="main-title">SIGN UP</div>
				</div>
       </div>

            <div className="inner-container social">
                <div className="inner-inner-container">
                    <button onClick={()=>onfb()} className="social-button facebook">Facebook</button>
                    <button onClick={()=>onLn()} className="social-button linkedin">LinkedIn</button>
                    <button onClick={()=>onTw()} className="social-button twitter">Twitter</button>
                    <button  onClick={()=>onGgl()} className="social-button google">Google</button>
                </div>
            </div>
            <div>
                <p className="or-container"><span className="or">or</span></p>
            </div>
        	<div className="inner-container form">
                <div className="inner-inner-container">
            		<input placeholder="FULL NAME" type="text" name = "fullname" value ={user.fullname} onChange = {this.handleChange} className="form-input" required/>
            		<input placeholder="EMAIL ADDRESS" type="text" name = "email" value ={user.email} onChange = {this.handleChange} className="form-input" required/>

            		<div className="double-input-container">
            			<input placeholder="PASSWORD" type="password" name= "password" value ={user.password} onChange = {this.handleChange} className="double-input" required/>
            			<input placeholder="RE-ENTER PASSWORD" type="password" name ="passwordRepeat" value ={user.passwordRepeat} onChange = {this.handleChange} className="double-input right-input" required/>
            		</div>
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
