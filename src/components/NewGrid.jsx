import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';
import {manageLogin} from '../util/login.js'

export default class NewGrid extends React.Component {
  constructor(){
    super();
    this.createGrid = this.createGrid.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    manageLogin(this.createGrid);
  }

  createGrid(uid) {
    this.gridRef = firebase.database().ref('grids/');
    // Add new grid to the grids/
    let newGridRef = this.gridRef.push();
    let usersObj = {};
    usersObj[uid] = true;
    let newGridObj = {};
    newGridObj['numCols'] = 6;
    newGridObj['numRows'] = 6;
    newGridObj['users'] = usersObj;
    newGridRef.set(newGridObj);
    // Add peprmission for the user who created.
    let userRef = firebase.database().ref('users/' + uid + '/grids/');
    let newGridKey = newGridRef.key;
    userRef.child(newGridKey).set('newGridName');
    this.props.changeGrid(newGridKey);
  }

  render(){
    return(
      <a className="nav-link" onClick={this.handleClick}>New Grid</a>
    );
  }
}


NewGrid.propTypes = {
  changeGrid: React.PropTypes.func
}
