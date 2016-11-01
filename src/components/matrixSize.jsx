import React from 'react';
import * as firebase from 'firebase';

import styles from '../main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MatrixSize extends React.Component {
  constructor() {
    super();
    this.state = {numRows: '',numCols: ''}
    this.onUpdateRow = this.onUpdateRow.bind(this);
    this.onUpdateCol = this.onUpdateCol.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  onUpdateRow(event) {
      this.setState({ numRows: event.target.value, gridId: this.props.gridId });
  }
  onUpdateCol(event) {
      this.setState({ numCols: event.target.value, gridId: this.props.gridId });
  }
  handleClick(){
    firebase.database().ref('grids/' + this.state.gridId).once('value', gridSnapshot => {
        var oldNumRows = gridSnapshot.child('numRows').val();
        var oldNumCols = gridSnapshot.child('numCols').val();

       if(oldNumRows !== null && oldNumRows > this.state.numRows)
       {
            gridSnapshot.forEach( childSnapshot => {
                var childKey = childSnapshot.key;
                if(childKey.startsWith('r') && parseInt(childKey.substr(1, childKey.length)) >= this.state.numRows)
                {
                    childSnapshot.ref.remove();
                }
            });
        }

        if(oldNumCols !== null && oldNumCols > this.state.numCols)
        {
            gridSnapshot.forEach( rowSnapshot => {
                rowSnapshot.forEach( colSnapshot => {
                    var colKey = colSnapshot.key;
                    if(colKey.startsWith('c') && parseInt(colKey.substr(1, colKey.length)) >= this.state.numCols)
                    {
                        colSnapshot.ref.remove();
                    }
                });
            });
        }

        gridSnapshot.child('numRows').ref.set(parseInt(this.state.numRows));
        gridSnapshot.child('numCols').ref.set(parseInt(this.state.numCols));

        this.props.updateGrid(this.state.gridId);
    });
  }
  componentDidMount(){
      this.setState({gridId: this.props.gridId});
  }

  render() {
    return (
    <div className="col-sm-9">
      <div className="input-group input-group-sm">
        <input
            className="form-control" type="text"
            placeholder="Enter new Row"
            defaultValue={ this.state.numCols }
            onChange={ this.onUpdateRow }
        />
        <input
            className="form-control" type="text"
            placeholder="Enter New Column"
            defaultValue={ this.state.numCols }
            onChange={ this.onUpdateCol }
        />
      </div>
      <button className="btn btn-primary btn-sm" onClick={ this.handleClick }>Update Grid</button>
    </div>
    );
  }
}

MatrixSize.propTypes = {
  gridId: React.PropTypes.string,
  updateGrid: React.PropTypes.func
}
