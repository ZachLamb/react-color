import React from 'react';
import * as firebase from 'firebase';

import styles from '.././main.scss';

export default class ResetGridColor extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick( event ){
    firebase.database().ref('grids/' + this.props.gridId).once('value', gridSnapshot => {
        gridSnapshot.forEach( childSnapshot => {
             var childKey = childSnapshot.key;
             if(childKey.startsWith('r') && parseInt(childKey.substr(1, childKey.length)) != NaN)
             {
                 childSnapshot.ref.remove();
             }
         });
     });
 }

  render(){
    if(this.props.enabled == "enabled"){
      return(
        <button className={ "btn btn-danger btn-sm " + styles.button } onClick={ this.handleClick }>Reset</button>
      )
    }
    else{
      return(
        <button className={ "btn btn-danger btn-sm " + styles.button } disabled={this.props.enabled} onClick={ this.handleClick }>Reset</button>
      )
    }
  }
}
