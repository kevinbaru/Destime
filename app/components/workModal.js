import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import Select from 'react-select';
import styles from '../../stylesheets/SignUp.css';
import {addPr} from '../actions/profile';
import {editPr} from '../actions/profile';
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

class WorkModal extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      job: {title:"", company:"",start:"", location:"",end:"", desc:"", jobId:0},
      type:{start:'text', end:'text'}
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(event) {
       const { name, value } = event.target;
       let { job } = this.state;
       this.setState({
           job: {
               ...job,
               [name]: value
           }
       });
   }

   handleFocus(event){
     const { name, value } = event.target;
     let { type } = this.state;
     if(name === "start" || name === "end" ){
       this.setState({  type: {...type, [name]: 'date'} })
     }
   }

   handleBlur(event){
     const { name, value } = event.target;
     let { type } = this.state;
     if(name === "end" || name === "start"){
      this.setState({  type: {...type, [name]: 'text'} })
     }
   }

   handleSubmit(event){
     event.preventDefault();
     let {job} = this.state;
     if(job.start){
       job.start = job.start.split('T')[0]
     }
     if(job.end){
       job.start = job.start.split('T')[0]
     }
     let { dispatch,u } = this.props;
     let res = {'section':'experience'}

     if(this.props.currJob){
       job.jobId = this.props.currJob.jobId
       u.experience[this.props.index] = job
       res['profile'] = u
       res['experience'] = job
       dispatch(editPr(res))
     }else{
       let len = u.experience.length

       if(len){
          job.jobId = u.experience[len - 1].jobId + 1
       }else{
         job.jobId = 0
       }

       u.experience.push(job)
       res['profile'] = u
       res['experience'] = job
       dispatch(addPr(res))
     }


     this.props.onClose()

   }

   componentDidMount(){

   }
   componentWillReceiveProps(nextProps){
     this.setState({job:nextProps.currJob})
   }


  render() {
    const { job,type } = this.state;
    const { errors,u,currJob } = this.props;

    return (
      <div>
        <Modal
          isOpen={this.props.show}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.onClose}
          style={customStyles}
          contentLabel="Work Experience"
        >

          <div className="container">
            <div className = "close" onClick={this.props.onClose}> </div>
            	<div className="inner-container form">
                    <div className="inner-inner-container">
                		<input placeholder="TITLE" type="text" name = "title" value ={job.title} onChange = {this.handleChange} className= "form-input"/>
                		<input placeholder="COMPANY" type="text" name = "company" value = {job.company} onChange = {this.handleChange} className="form-input"/>
                    <input placeholder="LOCATION" type="text" name = "location" value = {job.location} onChange = {this.handleChange} className="form-input"/>
                    <div className="double-input-container">
                			<input name = "start" placeholder="START DATE" type= {type.start} onChange = {this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} value= {job.start} className="double-input" />
                			<input name = "end" placeholder="END DATE" type= {type.end} onChange = {this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur}  value= {job.end} className="double-input right-input"/>
                		</div>
                		<textarea placeholder="DESCRIPTION" value = {job.desc} onChange = {this.handleChange} name="desc" className="form-input" id="about-input" cols="30" rows="10"></textarea>
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
)(WorkModal);
