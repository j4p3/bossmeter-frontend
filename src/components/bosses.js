import React, { Component } from 'react';

class Bosses extends Component{

componentDidMount(){
  this.props.getBossRatings();
}

  render(){
    return(
      <div>
        <h4>{this.props.getBossRatings}</h4>
      </div>
    )
  }
}

export default Bosses;
