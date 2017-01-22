import React, { Component } from 'react';

class Penguin extends Component{
  render(){
    let penguinPath = 'decentpenguin.png'
    if (this.props.score < 0.2) {
      penguinPath = 'penguin_0_20.png'
    } else if (this.props.score < 0.4) {
      penguinPath = 'penguin_20_40.png'
    } else if (this.props.score < 0.6) {
      penguinPath = 'penguin_60_80.png'
    } else if (this.props.score < 0.8) {
      penguinPath = 'decentpenguin.png'
    } else {
      penguinPath = 'decentpenguin.png'
    }
    return(
      <div>
        <img src={penguinPath} style={{maxWidth: "200px"}}/>
      </div>
    )
  }
}

export default Penguin;
