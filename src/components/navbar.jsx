import React from 'react';
import NewGrid from './newGrid.jsx';


import {manageLogin} from '../util/login.js'

import 'bootstrap/dist/css/bootstrap.min.css';

export default class NavBar extends React.Component {
  constructor(){
    super();
    this.state ={
      displayName: null
    }
    // this.handleClick = this.handleClick.bind( this );
  }
  componentWillReceiveProps(nextProps) {
      if (this.props.name !== nextProps.name) {
      this.setState({displayName: nextProps.name});
      }
  }
  render(){
    if(this.state.displayName != "null"){
      return(
        <nav className="navbar navbar-dark bg-info">
          <a className="navbar-brand" href="#">React Color</a>
          <ul className="nav navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Dashboard <span className="sr-only">(current)</span></a>
            </li>
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
          <li className="nav-item active">
            <a className="nav-link" href="#">Dashboard <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <NewGrid changeGrid={this.props.changeGrid}/>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Login</a>
          </li>
        </ul>
      </nav>
    );
    }
  }
}
NavBar.propTypes = {
  changeGrid: React.PropTypes.func,
  name: React.PropTypes.string
}
