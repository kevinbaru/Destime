import React from 'react';
import styles from '../../stylesheets/mainPage.css'
import history from '../history'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this)
  }

handleSignIn(){
  this.props.history.push('/login')
}
handleSignUp(){

  this.props.history.push('/signup')
}

  render() {
    return (
<div>
  <svg className="defs-only">
  <filter id="blue-tint" colorInterpolationFilters="sRGB"
    x="0" y="0" height="100%" width="100%">
    <feColorMatrix type="matrix"
      values="0.36 0 0 0  0.02
      0.64 0 0 0  0.06
      0.60 0 0 0  0.16
      0  0 0 1  0" />
  </filter>
</svg>
 	

 	<div className="main">

 	<div className="container">
 		<div className="row">

 			<div className="title-content col-lg-6">
        <div className ="icon center">
					<span className ="big-icon glyphicon glyphicon-send gradient-icon"></span>
				</div>
 				<h1 className="center">YOUR TITLE GOES HERE</h1>
 				<p className="center">Food truck +1 master cleanse, coloring book iPhone cray vegan fanny pack four dollar toast. Asymmetrical trust fund man bun photo booth marfa prism activated charcoal. Meggings man braclassName woke hoodie, hexagon palo santo viral succulents butcher offal la croix cloud bread. Heirloom dreamcatcher small batch, cronut paleo XOXO chicharrones biodiesel farm-to-table iPhone gentrify ramps banjo.</p>

 				<div className="main-buttons row center">
 					<div>
 						<button onClick = {this.handleSignIn} className="destime-big-button">SIGN IN</button>
 						<button onClick = {this.handleSignUp} className="destime-big-button">GET STARTED</button>
 					</div>

 				</div>
 			</div>


 			<div className = "col-lg-6">
 				<div className="play-button-contianer container center-div center">
 					<button className="home-play-button icon-button"><span className="glyphicon yellow big-icon glyphicon-play-circle"></span></button>
 					<p className="yellow normal-text" >SEE HOW IT WORKS</p>
 				</div>
 			</div>
      </div>
 		</div>
 	</div>

</div>

    );
  }
}

export default MainPage;
