import React from 'react';
import * as firebase from 'firebase';
import {matrixID} from './data.jsx';

export default class Randomize extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    var rows = matrixID[0];
    var columns = matrixID[1];

    
    var cells = Math.floor(Math.random()*rows*columns);


    for(var j=0; j<cells; j++)
    {
    var randomRow = 'r' + Math.floor(Math.random() * rows) + '/';
    var randomColumn = 'c' + Math.floor(Math.random() * columns) + '/';
    var cellRef = firebase.database().ref('grid0/' + randomRow + randomColumn);

    // change cell color
    cellRef.transaction(function() {
        return "rgb("+Math.floor(Math.random() * 255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random() * 255)+")";
      });
    }
  }
  render() {
    return (
      <div>
        <button className="button button-blue" onClick={this.handleClick}>Randomize</button>
      </div>
    )
  }
}