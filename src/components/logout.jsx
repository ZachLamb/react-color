import React from 'react';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Logout extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
  }
  handleClick(){
    this.logUserOut(this.props.checkLog);
  }

  logUserOut(callback) {
    firebase.auth().signOut().then(callback, (err) => {
      console.error('Sign Out Error', error);
    });
  }

  render(){
    return(
      <button type="button" className="btn btn-default" onClick={this.handleClick }>Logout</button>
    );
  }
}
Logout.propTypes = {
  checkLog : React.PropTypes.func
}
