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
      this.setState({ numRows: event.target.value,gridId: this.props.gridId });
  }
  onUpdateCol(event) {
      this.setState({ numCols: event.target.value });
  }
  handleClick(){
      firebase.database().ref('grids/' + this.state.gridId + '/numRows' ).set(parseInt(this.state.numRows));
      firebase.database().ref('grids/' + this.state.gridId + '/numCols' ).set(parseInt(this.state.numCols));

      this.props.updateGrid(this.state.gridId);
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
              defaultValue={this.state.numCols}
              onChange={this.onUpdateRow}
          />
          <input
              className="form-control" type="text"
              placeholder="Enter New Column"
              defaultValue={this.state.numCols}
              onChange={this.onUpdateCol}
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
