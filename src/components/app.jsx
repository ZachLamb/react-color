import React from 'react';
import * as firebase from 'firebase';

import Matrix from './matrix.jsx';
import Palette from './palette.jsx';
import GridSelector from './GridSelection.jsx';
import NavBar from './navbar.jsx';
import NewGrid from './newGrid.jsx';
import SideBar from './sidebar.jsx';

import {signInIfReturning} from '../util/login.js'

import styles from '../main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedColor: 'rgb(0, 0, 0)',
      gridId: 'null',
      possibleGrids: {},
      numRows: 0,
      numCols: 0,
      displayName: null
    }
    this.onSelectColor = this.onSelectColor.bind(this);
    this.changeGrid = this.changeGrid.bind(this);
    this.getAvailableGrids = this.getAvailableGrids.bind(this);
    this.checkLogout = this.checkLogout.bind(this);
  }

  componentDidMount() {
    signInIfReturning(this.getAvailableGrids);
  }

  getAvailableGrids(uid) {
    let userGridsRef = firebase.database().ref('users/' + uid + '/grids');
    let session = localStorage.getItem('displayName')
    this.setState({displayName: session})
    userGridsRef.on('value', snap => {
       this.setState({possibleGrids: snap.val()});
    });
  }

  checkLogout(){
    this.setState({displayName: null});
    this.setState({gridId: null});
    Location.reload();
  }

  onSelectColor( val ){
    this.setState({ selectedColor: val });
  }
  changeGrid(newGrid) {
    this.setState({gridId: newGrid});

    let rowRef = firebase.database().ref('grids/' + newGrid +'/numRows');
    rowRef.on('value', snap => {
        this.setState({numRows: snap.val()});
    });
    let colRef = firebase.database().ref('grids/' + newGrid +'/numCols');
    colRef.on('value', snap => {
        this.setState({numCols: snap.val()});
    });
  }

  resetGridColors(){
    this.setState({selectedColor: 'rgb(0, 0, 0)'});
  }

  render() {
    if(this.state.displayName == null){
      return(
        <NavBar changeGrid={this.changeGrid} 
                name={ this.state.displayName } 
                getGrid={ this.getAvailableGrids } 
                checkLog={ this.checkLog }
        />
      )
    }
    else{
      return (
        <div className={styles.wrapper}>
          <NavBar changeGrid={this.changeGrid} 
                  name={ this.state.displayName } 
                  getGrid={ this.getAvailableGrids } 
                  checkLog={ this.checkLog }
          />

          <div className="container row">
            <div className="col-md-3">
              <SideBar gridId={this.state.gridId}
                       numCols={ this.state.numCols }
                       numRows={ this.state.numRows }
              />
            </div>

            <div className="col-md-9">
              <div className={ "row " + styles.topBuffer }>
                <div className="col-sm-2">
                  <GridSelector gridSelector={ this.changeGrid }
                                possibleGrids={ this.state.possibleGrids }
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-10">
                    <Matrix color={ this.state.selectedColor }
                            gridId={ this.state.gridId }
                            numCols={ this.state.numCols }
                            numRows={ this.state.numRows }
                    />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-2">
                  <Palette onSelectColor={ this.onSelectColor }/>
                </div>
              </div> {/* row */}
            </div> {/* col-md-9 */}
          </div> {/* container row */}

        </div>
      )
    }
  }
}
