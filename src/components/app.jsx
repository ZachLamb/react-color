import React from 'react';
import {matrixID} from './data.jsx';
import Matrix from './matrix.jsx';
import Palette from './palette.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Randomize from './randomize.jsx';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedColor: 'rgb(0, 0, 0)'
    }
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate( val ){
    this.setState({ selectedColor: val });
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-6">
            <Matrix color={ this.state } />
        </div>
        <div className="col-xs-6">
            <div><Palette onUpdate={ this.onUpdate }/></div>
            <div><Randomize /></div>
        </div>
      </div>
    )
  }
}
