import React from 'react';
import * as firebase from 'firebase';
import {matrixID} from './data.jsx';
import Matrix from './matrix.jsx';
export default class Fireworks extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const gridId = this.props.gridId + '/';
    const rows = parseInt(this.props.numRows)
    const columns = parseInt(this.props.numCols);

    const rowNum = rows/2;
    const columnNum = columns/2;

    const cursorRow = 'r' + rowNum + '/';
    const cursorColumn = 'c' + columnNum + '/';
    const cellRef = firebase.database().ref('grids/' + gridId + cursorRow + cursorColumn);
    const color = "rgb(255, 0, 0)";

    // cellRef.once("value", function(snapshot) {
    //   console.log(snapshot.val());
    // });

    // this.north(gridId, rowNum, columnNum);
    this.explode(gridId, rowNum, columnNum, rows, columns);

    cellRef.transaction(function() {
      return color;
    });
  }

  explode(gridId, rowNum, columnNum, rows, columns) {
    var rowsNorth = rowNum;
    var rowsSouth = rows - rowNum;
    var columnsEast = columns - columnNum;
    var columnsWest = columnNum;
    while (rowsNorth > 0 || rowsSouth < rows || columnsEast < columns || columnsWest > 0) {
      
      if (rowsNorth > 0) {
        this.north(gridId, rowsNorth, columnNum);
        rowsNorth--;
      }

      if (rowsSouth < rows) {
        this.south(gridId, rowsSouth, columnNum);
        rowsSouth++;
      }

      if (columnsEast < columns) {
        this.east(gridId, rowNum, columnsEast);
        columnsEast++;
      }

      if (columnsWest > 0) {
        this.west(gridId, rowNum, columnsWest);
        columnsWest--;
      }

    }
  }

  north(gridId, startRow, startColumn) {
    if (startRow > 0) {
      const cursorRow = 'r' + (startRow-1) + '/';
      const cursorColumn = 'c' + startColumn + '/';
      const cellRef = firebase.database().ref('grids/' + gridId + cursorRow + cursorColumn);
      const color = "rgb(255, 0, 0)";

      cellRef.transaction(function() {
        return color;
      });
    }
  }

  south(gridId, startRow, startColumn) {
    if (startRow > 0) {
      const cursorRow = 'r' + (startRow+1) + '/';
      const cursorColumn = 'c' + startColumn + '/';
      const cellRef = firebase.database().ref('grids/' + gridId + cursorRow + cursorColumn);
      const color = "rgb(255, 0, 0)";

      cellRef.transaction(function() {
        return color;
      });
    }
  }

  east(gridId, startRow, startColumn) {
    if (startRow > 0) {
      const cursorRow = 'r' + startRow + '/';
      const cursorColumn = 'c' + (startColumn+1) + '/';
      const cellRef = firebase.database().ref('grids/' + gridId + cursorRow + cursorColumn);
      const color = "rgb(255, 0, 0)";

      cellRef.transaction(function() {
        return color;
      });
    }
  }

  west(gridId, startRow, startColumn) {
    if (startRow > 0) {
      const cursorRow = 'r' + startRow + '/';
      const cursorColumn = 'c' + (startColumn-1) + '/';
      const cellRef = firebase.database().ref('grids/' + gridId + cursorRow + cursorColumn);
      const color = "rgb(255, 0, 0)";

      cellRef.transaction(function() {
        return color;
      });
    }
  }

  render() {
    return (
      <div>
        <button className="button" className="btn btn-default" onClick={this.handleClick}>Fireworks</button>
      </div>
    )
  }
}
