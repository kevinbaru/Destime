import React from 'react';
import {connect} from 'react-redux';
import styles from '../../stylesheets/myProfile.css';
import alertStyles from '../../stylesheets/alerts.css';
import { Router, Route} from 'react-router';
import { Link } from 'react-router-dom';
import WorkModal from './workModal';
import EduModal from './eduModal';
import {addPr} from '../actions/profile';
import {deletePr} from '../actions/profile';
import {logoutUser} from '../actions/logout';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
               workModalOpen:false, eduModalOpen:false, currJob:false, currEdu:false, index:0,ind:0,skill:"", skillset:this.props.profile.skills ||[]
             }
  this.openModal = this.openModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.editModal = this.editModal.bind(this);
  this.openEduModal = this.openEduModal.bind(this);
  this.closeEduModal = this.closeEduModal.bind(this);
  this.editEduModal = this.editEduModal.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleAdd = this.handleAdd.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event){
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(logoutUser())
  }

  openModal() {
    this.setState({workModalOpen:true});
  }

  closeModal() {
    this.setState({workModalOpen:false,currJob:false});
  }

  openEduModal() {
    this.setState({eduModalOpen:true});
  }

  closeEduModal() {
    this.setState({eduModalOpen:false,currEdu:false});
  }


  editModal(job,index){
    this.setState({workModalOpen:true, currJob:job,index:index});
    console.log('jobu',this.state.currJob)
  }

  editEduModal(edu,index){
    this.setState({eduModalOpen:true, currEdu:edu,ind:index});
    console.log('jobu',this.state.currEdu)
  }

  handleChange(event) {
       const { value } = event.target;
       let { skill} = this.state;
       this.setState({skill:value});
   }
  handleAdd(event){

    let {skill} = this.state;

    let { dispatch,profile} = this.props;
    let res = {'section':'skills'}
    profile.skills.push(skill)

    res['profile'] = profile
    res['skills'] = skill
    dispatch(addPr(res))
    this.setState({skill:""})
  }

  deleteSkill(skill,index){

    let { dispatch,profile} = this.props;
    let res = {'section':'skills'}
    profile.skills.splice(index,1)

    res['profile'] = profile
    res['skills'] = skill
    dispatch(deletePr(res))
    this.setState({skill:""})

  }
  deleteEducation(edu,index){
    let { dispatch,profile} = this.props;
    let res = {'section':'education'}
    profile.education.splice(index,1)

    res['profile'] = profile
    res['education'] = edu
    dispatch(deletePr(res))
    this.setState({skill:""})

  }

  deleteExperience(job,index){
    let { dispatch,profile} = this.props;
    let res = {'section':'experience'}
    profile.experience.splice(index,1)

    res['profile'] = profile
    res['experience'] = job
    dispatch(deletePr(res))
    this.setState({skill:""})

  }


  render() {
    const { error,profile,status } = this.props;
    const { workModalOpen,currJob,index,ind,currEdu,eduModalOpen ,skill,skillset} = this.state;

    return (

      <div className = "bodyCont">
           <WorkModal index={index} currJob = {currJob} show = {workModalOpen} onClose ={this.closeModal}/>
           <EduModal index={ind} currEdu = {currEdu} show = {eduModalOpen} onClose ={this.closeEduModal}/>
           {
             status.type === 'alert-success'? <div  className='snackbar my-notify-success'> {status.message}</div>:null
           }
           {
             status.type === 'alert-danger'? <div  className='snackbar my-notify-error'> {status.message}</div>:null
           }

        <div className = "headr" >
          <div>
            <img src={require('./../../images/logo.png')} />
          </div>

          <button onClick = {this.handleLogout}> Logout</button>

        </div>
        <div className = "aside">
            <img src={require('./../../images/blankProfilePic.png')} />

        <div className= "sideSeparator">
          <div className = "subtitle">
            <b>BASIC INFO</b>
          </div>
          <div className = "dashline">
          </div>
        </div>
        <div className = "info">

           <p>Birth Date: {profile.mainInfo && profile.mainInfo.dob? profile.mainInfo.dob.split('T')[0]:""}</p>
            <p>Gender: {profile.mainInfo && profile.mainInfo.gender}</p>
            <p>University: {profile.mainInfo && profile.mainInfo.university}</p>
            <p>Course:{profile.mainInfo && profile.mainInfo.major}</p>

        </div>
        <div className= "sideSeparator">
          <div className = "subtitle">
            <b>MY DESTIME</b>
          </div>
          <div className = "dashline">
          </div>
        </div>
        <div className = "info">
           <p>Birth Date: 12/21/1991</p>
            <p>Gender: Male</p>
            <p>University: Princeton University</p>
            <p>Course:Computer Programming</p>
        </div>
        <div className= "sideSeparator">
          <div className = "subtitle">
            <b>MY ESSENCE</b>
          </div>
          <div className = "dashline">
          </div>
        </div>
        <div className = "info">

           <p>Birth Date: 12/21/1991</p>
            <p>Gender: Male</p>
            <p>University: Princeton University</p>
            <p>Course:Computer Programming</p>

        </div>
        <div className= "sideSeparator">
          <div className = "subtitle">
            <b>SOCIAL</b>
          </div>
          <div className = "dashline">
          </div>
        </div>
        <div className = "info">
           <i className="fa fa-facebook" ></i>
           <i className="fa fa-linkedin" ></i>
           <i className="fa fa-github" ></i>
           <i className="fa fa-painterest-p" ></i>
           <i className="fa fa-google-plus" ></i>
           <i className="fa fa-twitter" ></i>
        </div>
        </div>
        <div className = "bio">
          <div className="topic">
            <div className ="tops"><span className = "name">{profile.mainInfo && profile.mainInfo.firstname} {profile.mainInfo && profile.mainInfo.lastname}</span><i className="fa fa-map-marker" ></i><span className = "location">{profile.mainInfo && profile.mainInfo.city}</span></div> <button className ="button1 editbtn" ><Link to={'/editProfile'}>EDIT BIO</Link></button>
          </div>
          <div className = "title"> {profile.mainInfo && profile.mainInfo.profession}</div>
          <div className = "minorDetails">
            <p> 03040204204</p>
            <p> baru@gmail.com</p>
            <p>{profile.mainInfo && profile.mainInfo.website}</p>
          </div>
          <div className = "descr">
            <div className = "lbl">
              ME
            </div>
          <div className = "essay">
             {profile.mainInfo && profile.mainInfo.blurb}
          </div>

          </div>

        </div>
        <div className ="cont">
          <Tabs>
            <TabList>
              <Tab>Experience</Tab>
              <Tab>Education </Tab>
              <Tab>Skills</Tab>
            </TabList>
            <div className = "tabLine"></div>
            <TabPanel>
            <div className = "outer-wrapper">
              <div className = "fa fa-plus add" onClick={this.openModal}></div>
              {  profile.experience.map((job,index) =>{
                job.start = job.start? job.start.split('T')[0]:null
                job.end = job.end? job.end.split('T')[0]:null
                return(
                  <div className = "inner-wrapper">
                <div key ={job.jobId} className = "work">
                  <div className = "title">{job.title}</div>
                  {job.start? <p>{job.start}  ~  {job.end} </p>:null}
                  <p>{job.company} </p>
                  <p>{job.location}</p>
                  <p className = "descr">  {job.desc} </p>
                  <div className = "dashline"></div>
                </div>
                <div className = "etools">
                  <div className = "fa fa-pencil edt" onClick={() => this.editModal(job,index)} ></div>
                  <div className = "fa fa-trash edt" onClick={() => this.deleteExperience(job,index)} ></div>
                </div>
              </div>
              )
              })
              }
            </div>
            </TabPanel>
            <TabPanel>
              <div className = "outer-wrapper">
                <div className = "fa fa-plus add" onClick={this.openEduModal}></div>
                { profile.education.map((edu,index) =>{
                  return(
                    <div className = "inner-wrapper">
                    <div key={edu.skulId} className = "work">

                      <div className = "title">{edu.name}</div>
                      <p> {edu.degree}</p>
                      <p> {edu.major}</p>
                      <p> {edu.minor}</p>
                      <p> {edu.graduation? edu.graduation.split('T')[0]:""} </p>
                      <p>{edu.location}</p>
                      <div className = "dashline"></div>

                    </div>
                    <div className = "etools">
                      <div className = "fa fa-pencil edt" onClick={() => this.editEduModal(edu,index)} ></div>
                      <div className = "fa fa-trash edt" onClick={() => this.deleteEducation(edu,index)} ></div>
                    </div>
                    </div>
                  )
                })
              }
              </div>
            </TabPanel>
            <TabPanel>

              <div className="add-skill-bar">
              	<input placeholder="ENTER SKILL" type="text" name = "skill" value ={skill} onChange = {this.handleChange} className = "entry"/>
                <button className = "fa fa-plus add-skill-button" onClick ={this.handleAdd}> </button>
              </div>
              <div className = "skillz">
                { skillset.map((skill,index) =>{
                  return(<li>{skill} <span className = "fa fa-times removeSkill" onClick = {() => this.deleteSkill(skill,index)}></span></li>)
                  })
                }
            </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    )}
  }

  const mapStateToProps = (state) => {
    return {
        status:state.alert,
        profile:state.signIn.profile,


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
)(MyProfile);
