import styles from '.././index.scss';
import React from 'react';
import colors from '.././_variables.scss'

export default class Cell extends React.Component {
  constructor() {
      super();
      this.state = {
          color: 'white'
      }
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.color === 'white') {
        this.setState({color: 'black'});
    } else {
        this.setState({color: 'white'});
    }
  }

  render() {
    const color_style = {backgroundColor: this.state.color};
    return (
      <div>
        <div onClick={this.handleClick}
             style={color_style}
             className={styles.cell}>
        </div>
      </div>
    )
  }
}
