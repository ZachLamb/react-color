import React from 'react';
import Matrix from './matrix.jsx';
import Palette from './palette.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedColor: 'rgb(0, 0, 0)',
      gridId: 'grids/grid0',
    }
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate( val ){
    this.setState({ selectedColor: val });
  }

  render() {
    return (
      <div className="container">
        <div className="col-sm-6">
            <Matrix color={ this.state.selectedColor }
                    gridID={ this.state.gridId }/>
        </div>
        <div className="col-sm-6">
            <Palette onUpdate={ this.onUpdate }/>
        </div>
      </div>
    )
  }
}
