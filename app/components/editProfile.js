import React from 'react';
import {connect} from 'react-redux';
import styles from '../../stylesheets/SignUp.css';
import {editProfile} from '../actions/profile';
import Select from 'react-select';
import {Creatable} from 'react-select';
import { Router, Route} from 'react-router';
import { Link } from 'react-router-dom';
import history from  '../history';
import '../../stylesheets/react_select.css';
import {countries} from '../data/country.json';
import states from '../data/UsStates.json';
import cities from '../data/citiesByState.json';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props,'fisssss')
    let {u} = this.props
    this.state ={profile: {firstname:u.mainInfo && u.mainInfo.firstname || "", lastname:u.mainInfo && u.mainInfo.lastname||"", website: u.mainInfo && u.mainInfo.website||"", currLocation:u.mainInfo && u.mainInfo.currLocation || "",
                 blurb:u.mainInfo && u.mainInfo.blurb ||"", gender:u.mainInfo && u.mainInfo.gender||"",telephone:u.mainInfo && u.mainInfo.telephone || "", profession:u.mainInfo && u.mainInfo.profession ||"", major: u.mainInfo && u.mainInfo.major||"",
                dob:u.mainInfo && u.mainInfo.dob.split('T')[0] || "",country:u.mainInfo && u.mainInfo.country||"", state:u.mainInfo && u.mainInfo.state||"", city:u.mainInfo && u.mainInfo.city||""},
               type:{dob:'text'},

             }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleFocus = this.handleFocus.bind(this)
  this.handleBlur = this.handleBlur.bind(this)
  this.handleCancel = this.handleCancel.bind(this)
  this.handleCountry = this.handleCountry.bind(this)
  this.handleState = this.handleState.bind(this)
  this.handleCity = this.handleCity.bind(this)
  this.handleGender = this.handleGender.bind(this)

  }

  handleFocus(event){
    const { name, value } = event.target;
    let { type } = this.state;
    if(name === "dob"){
      this.setState({  type: {...type, [name]: 'date'} })
    }
  }

  handleBlur(event){
    const { name, value } = event.target;
    let { type } = this.state;
    if(name === "dob"){
     this.setState({  type: {...type, [name]: 'text'} })
    }
  }

  handleCancel(event){
    event.preventDefault
    history.push('/myProfile')
  }

  handleCountry(selectedOption){
   console.log(`Selected: ${selectedOption.label}`);
   let { profile } = this.state;
   this.setState({
       profile: {
           ...profile,
           ['country']: selectedOption.value
       }
   });
 }
 handleState(selectedOption){
  console.log(selectedOption)
  console.log(`Selected: ${selectedOption.label}`);
  let { profile } = this.state;
  this.setState({
      profile: {
          ...profile,
          ['state']: selectedOption.value
      }
  });
  console.log(`Selected: ${selectedOption.label}`);
 }
  handleCity(selectedOption){
   console.log(selectedOption)
   console.log(`Selected: ${selectedOption.label}`);
   let { profile } = this.state;
   this.setState({
       profile: {
           ...profile,
           ['city']: selectedOption.value
       }
   });
   console.log(`Selected: ${selectedOption.label}`);
  }

  handleChange(event){
      const { name, value } = event.target;

      let { profile } = this.state;
      this.setState({
          profile: {
              ...profile,
              [name]: value
          }
      });

  }

 handleGender(event){
    console.log(event.target.name,event.target.value,'changing gender')
  }
 handleSubmit(event){
   event.preventDefault();
   const {profile} = this.state;
   const { dispatch,u } = this.props;
   if (profile.dob){
     profile.dob = profile.dob.split('T')[0]
   }
   let pcopy = u
   pcopy.mainInfo = profile
   console.log(pcopy,'jkkk')
   if (profile.firstname && profile.lastname){
     dispatch(editProfile(pcopy));
   }

 }


  render() {
    const { errors,u } = this.props;
    const { profile,type } = this.state;


    return (

      <div className="container">
        <div className="header">
        	<img id = "logo" src = {require('./../../images/logo.png')} alt = "Destime"/>
				<div className="title-container">
					<div className="main-title">EDIT PROFILE</div>
				</div>
       </div>
        	<div className="inner-container form">
                <div className="inner-inner-container">
            		<input placeholder="FIRST NAME" type="text" name = "firstname" value ={profile.firstname} onChange = {this.handleChange} className="form-input" required/>
                <input placeholder="LAST NAME" type="text" name = "lastname" value ={profile.lastname} onChange = {this.handleChange} className="form-input" required/>
                <input placeholder="TELEPHONE NUMBER" type="text" name = "telephone" value ={profile.telephone} onChange = {this.handleChange} className="form-input"/>
            		<input placeholder="PROFESSION" type="text" name ="profession" value = {profile.profession} onChange = {this.handleChange} className="form-input"/>
            		<div className="double-input-container">
            			<input name = "dob" placeholder= "DATE OF BIRTH" type= {type.dob}  onChange = {this.handleChange}  onFocus={this.handleFocus} onBlur={this.handleBlur} value= {profile.dob} className="double-input" />
                  <select value ={profile.gender} placeholder = "GENDER" name = "gender" onChange = {this.handleChange} className = "double-input right-input">
                    <option value = "Male"> Male </option>
                    <option value = "Female"> Female </option>
                    <option value = "Other"> Other </option>
                  </select>
            		</div>

                <Creatable name="country" value= {profile.country} placeholder ="COUNTRY" options={countries} onChange={this.handleCountry} />
                <Creatable name="state" value= {profile.state} placeholder ="STATE/PROVINCE" options={states} onChange={this.handleState}/>
                <Creatable name="city" value= {profile.city} placeholder ="CITY" options={profile.state && cities[profile.state]? cities[profile.state]:cities['New York']} onChange={this.handleCity} />
                <textarea placeholder="TELL US ABOUT YOURSELF" value = {profile.blurb} name="blurb" onChange = {this.handleChange} className="form-input" id="about-input" cols="30" rows="10"></textarea>
            		<button id="upload-button">UPLOAD YOUR PROFILE PICTURE</button>
                <input className = "form-input" type="file" capture />

                <button id="save-button" onClick={this.handleSubmit}>SAVE </button>
                <button id="cancel-button" onClick={this.handleCancel}>CANCEL</button>

                </div>
           </div>

        </div>

    )}
  }

  const mapStateToProps = (state) => {
    return {
      u:state.signIn.profile,

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
)(EditProfile);
