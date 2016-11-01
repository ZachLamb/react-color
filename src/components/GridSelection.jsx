import React from 'react';

import styles from '../main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class GridSelector extends React.Component {
  render() {
    var buttons = [];
    for (let gridName in this.props.possibleGrids) {
        buttons.push(
          <button className={ "btn btn-default " + styles.gridButton } key={gridName} onClick={() => {
            this.props.gridSelector(gridName);
          }}>
            {this.props.possibleGrids[gridName]}
          </button>)
    }
    return (
       <div className={ styles.gridList }>{buttons}</div>
    )
  }
}

GridSelector.propTypes = {
    gridSelector: React.PropTypes.func,
    possibleGrids: React.PropTypes.object
}
