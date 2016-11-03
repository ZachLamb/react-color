import React from 'react';

import ShareComponent from './shareComponent.jsx';
import MatrixSize from './matrixSize.jsx';
import ResetGridColor from './resetGridColor.jsx';
import DeleteGrid from './deleteGrid.jsx';
import Randomize from './randomize.jsx';

import styles from '../main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {enabled: "disabled" }
  }

  componentDidMount(){
    if(this.props.gridId == "null"){
      this.setState({enabled: "disabled"});
    }
    else{
      this.setState({enabled: "enabled"})
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.gridId == "null") {
      this.setState({enabled: "disabled"});
    }
    else{
      this.setState({enabled: "enabled"})
    }
  }
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
                           enabled={this.state.enabled}
                />
                <ResetGridColor gridId={ this.props.gridId }
                                numCols={ this.props.numCols }
                                numRows={ this.props.numRows }
                                enabled={ this.state.enabled }
                />
                <DeleteGrid gridId={ this.props.gridId }
                            gridRemoval={ this.props.changeGrid }
                            enabled={ this.state.enabled }
                />
            </div>
          </div> {/* row .dangerZone */}

          <div className={ "row " + styles.options }>
            <span className={ styles.sidebarHeader } >Sharing</span>
          </div>
          <div className={ "row " + styles.optionSection }>
            <div className="col-sm-10">
              <ShareComponent enabled={ this.state.enabled } gridId={ this.props.gridId }/>
            </div>
          </div> {/* row */}

        </div> {/* .sidebarContent */}
      </div>
    );
  }
}

{/* Source: https://github.com/BlackrockDigital/startbootstrap-simple-sidebar */}
