import React from 'react';
import NewGrid from './newGrid.jsx';
import * as firebase from 'firebase';

import {manageLogin} from '../util/login.js'

import styles from '../main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class NavBar extends React.Component {
  constructor(){
    super();
    this.state ={
      displayName: null
    }
    this.handleClickLogin = this.handleClickLogin.bind( this );
  }
  componentWillReceiveProps(nextProps) {
      if (this.props.name !== nextProps.name) {
      this.setState({displayName: nextProps.name});
      }
  }
  componentDidMount(){
    this.setState({displayName: this.props.name});
  }
  handleClickLogin(){
      manageLogin(this.props.getGrid);
  }

  render(){
    if(this.state.displayName !== null){
      return(
        <nav className={ "navbar navbar-dark bg-info " + styles.navBar }>
          <a className="navbar-brand" href="#">React Color</a>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <NewGrid changeGrid={this.props.changeGrid}/>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">{this.props.name}</a>
            </li>
          </ul>
        </nav>
      );
    }
    else{
      return(
      <nav className="navbar navbar-dark bg-info">
        <a className="navbar-brand" href="#">React Color</a>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <NewGrid changeGrid={this.props.changeGrid}/>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={this.handleClickLogin} href="#">Login</a>
          </li>
        </ul>
      </nav>
    );
    }
  }
}
NavBar.propTypes = {
  changeGrid: React.PropTypes.func,
  name: React.PropTypes.string,
  getGrid: React.PropTypes.func,
  checkLog: React.PropTypes.func
}
