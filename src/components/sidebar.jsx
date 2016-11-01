import React from 'react';

import ShareComponent from './shareComponent.jsx';
import MatrixSize from './matrixSize.jsx';
import ResetGridColor from './resetGridColor.jsx';
import DeleteGrid from './deleteGrid.jsx';
import Randomize from './randomize.jsx';

import styles from '../main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SideBar extends React.Component {
  render(){
    return(
      <div className={ styles.sidebarNav }>
        <div className={ styles.sidebarContent }>
          <div className="row">
            <span style={{ fontWeight: 600, marginLeft: '15px', color: 'rgba(0, 0, 0, 0.75)'}}>Grid Options</span>
          </div>
          <div className="row">
            <MatrixSize gridId={ this.props.gridId } 
                        updateGrid={ this.changeGrid }
            />
          </div>
          <div className="row col-sm-9">
            <ShareComponent gridId={ this.props.gridId }/>
          </div>
          <div className={ "row " + styles.dangerZone }>
            <div className="btn-group-vertical col-sm-9">
                <ResetGridColor gridId={ this.props.gridId }
                                numCols={ this.props.numCols }
                                numRows={ this.props.numRows }
                />
                <DeleteGrid gridId={ this.props.gridId } 
                            gridRemoval={ this.changeGrid }
                />
                <Randomize gridId={this.props.gridId}
                            numCols={this.props.numCols}
                            numRows={this.props.numRows} 
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

{/* Source: https://github.com/BlackrockDigital/startbootstrap-simple-sidebar */}