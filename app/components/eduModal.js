import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import styles from '../../stylesheets/SignUp.css';
import {addPr} from '../actions/profile';
import {editPr} from '../actions/profile';
import Select from 'react-select';
import {Creatable} from 'react-select';
import colleges from '../data/USColleges.json';



const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.25)'
  },
  content: {
  position                   : 'absolute',
    top                        : '40px',
    left                       : '60px',
    right                      : '60px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#0B0424',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',

  }

};

class EduModal extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      school: {name:"", degree:"",graduation:"", location:"", major:"",minor:"",skulId:0},
      type:{graduation:'text'}
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleCollege = this.handleCollege.bind(this)
  }

  handleChange(event) {
       const { name, value } = event.target;
       let { school } = this.state;
       this.setState({
           school: {
               ...school,
               [name]: value
           }
       });
   }

   handleFocus(event){
     const { name, value } = event.target;
     let { type } = this.state;
     if(name === "graduation" ){
       this.setState({  type: {...type, [name]: 'date'} })
     }
   }

   handleBlur(event){
     const { name, value } = event.target;
     let { type } = this.state;
     if(name === "graduation"){
      this.setState({  type: {...type, [name]: 'text'} })
     }
   }

   handleCollege(selectedOption){
    console.log(selectedOption)
    console.log(`Selected: ${selectedOption.label}`);
    let { school } = this.state;
    this.setState({
        school: {
            ...school,
            ['name']: selectedOption.value
        }
    });
    console.log(`Selected: ${selectedOption.label}`);
   }

   handleSubmit(event){
     event.preventDefault();
     let {school} = this.state;
     if(school.graduation){
       school.graduation = school.graduation.split('T')[0]
     }

     let { dispatch,u } = this.props;
     let res = {'section':'education'}

     if(this.props.currEdu){
       school.skulId = this.props.currEdu.skulId
       u.education[this.props.index] = school
       res['profile'] = u
       res['education'] = school
       dispatch(editPr(res))
     }else{
       console.log('Addding')
       let len = u.education.length

       if(len){
          school.skulId = u.education[len - 1].skulId + 1
       }else{
         school.skulId = 0
       }

       u.education.push(school)
       res['profile'] = u
       res['education'] = school
       dispatch(addPr(res))
     }
     this.props.onClose()

   }

   componentDidMount(){

   }
   componentWillReceiveProps(nextProps){
     this.setState({school:nextProps.currEdu})
   }


  render() {
    const { school,type } = this.state;
    const { errors,u,currEdu } = this.props;

    return (
      <div>
        <Modal
          isOpen={this.props.show}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.onClose}
          style={customStyles}
          contentLabel="Education"
        >
          <div className="container">
            <div className = "close" onClick={this.props.onClose}> </div>
            	<div className="inner-container form">
                    <div className="inner-inner-container">
                    <Creatable name="country" value= {school.name} placeholder ="SCHOOL" options={colleges} onChange={this.handleCollege} />
                		<input placeholder="DEGREE" type="text" name = "degree" value = {school.degree} onChange = {this.handleChange} className="form-input"/>
                    <input placeholder="MAJOR" type="text" name = "major" value = {school.major} onChange = {this.handleChange} className="form-input"/>
                    <input placeholder="MINOR" type="text" name = "minor" value = {school.minor} onChange = {this.handleChange} className="form-input"/>
                    <input placeholder="LOCATION" type="text" name = "location" value = {school.location} onChange = {this.handleChange} className="form-input"/>
                    <input placeholder="GRADUATION DATE" type={type.graduation} name = "graduation" value = {school.graduation && school.graduation.split('T')[0]} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange = {this.handleChange} className="form-input"/>
                    <button id="save-button" onClick={this.handleSubmit}>SAVE </button>
                    <button id="cancel-button" onClick={this.props.onClose}>CANCEL</button>
                    </div>
               </div>

            </div>
        </Modal>
      </div>
    );
  }
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
)(EduModal);
