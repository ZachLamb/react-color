import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class GridSelector extends React.Component {
  constructor() {
    super();
    this.state = {
        possibleGrids: {
            grid0: true,
            grid1: true
        }
    }
  }

  render() {
    var buttons = [];
    for (let gridName in this.state.possibleGrids) {
        buttons.push(<button onClick={() => {
            console.log(gridName);
            this.props.gridSelector(gridName);
        }}>{gridName}</button>)
    }
    return (
       <div> {buttons}</div>
    )
  }
}
