import React from 'react';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Logout extends React.Component {
  render(){
    return(
      <button type="button" className="btn btn-default" onClick={this.props.logout()}>Logout</button>
    );
  }
}
Logout.propTypes = {
  logout: React.PropTypes.func
}
