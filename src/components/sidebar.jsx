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

          <div className={ "row " + styles.options }>
            <span className={ styles.sidebarHeader }>Grid Options</span>
          </div>
          <div className={ "row " + styles.optionSection }>
            <MatrixSize gridId={ this.props.gridId } 
                        updateGrid={ this.props.changeGrid }
            />
          </div> {/* row */}

          <div className={ "row " + styles.options }>
            <span className={ styles.sidebarHeader }>Danger Zone</span>
          </div>
          <div className={ "row " + styles.optionSection }>
            <div className="btn-group-vertical col-sm-10">
                <Randomize gridId={this.props.gridId}
                           numCols={this.props.numCols}
                           numRows={this.props.numRows}
                />
                <ResetGridColor gridId={ this.props.gridId }
                                numCols={ this.props.numCols }
                                numRows={ this.props.numRows }
                />
                <DeleteGrid gridId={ this.props.gridId } 
                            gridRemoval={ this.props.changeGrid }
                />
            </div>
          </div> {/* row .dangerZone */}

          <div className={ "row " + styles.options }>
            <span className={ styles.sidebarHeader }>Sharing</span>
          </div>
          <div className={ "row " + styles.optionSection }>
            <div className="col-sm-10">
              <ShareComponent gridId={ this.props.gridId }/>
            </div>  
          </div> {/* row */}

        </div> {/* .sidebarContent */}
      </div>
    );
  }
}

{/* Source: https://github.com/BlackrockDigital/startbootstrap-simple-sidebar */}