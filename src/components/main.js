import React, { Component } from 'react';
import Bosses from './bosses';

class App extends Component {
  constructor(){
    super();

    this.state={
      currentEmotions: {
        anger: '',
        joy: '',
        disgust: ''
      },
      currentRatings: {
        score: '',
        name: '',
        space: ''
    }
  }
}

getBossRatings(){
  console.log('boss rating');
  fetch(`http://bossmeter.herokuapp.com/api/space/person`)
  .then(r => r.json())
  .then((data) =>
    this.setState({
      currentRatings: {
        score: data.score,
        name: data.name,
        space: data.space
      }
    })
  )
}

  render() {
    return (
      <div className="App">

        <div className="heading">
          <h2>BOSSMETER</h2>
        </div>

        <div className="main">
          <p className="subheading">
            Hello there.
          </p>
            <p className="desc">
              Here's how your employees are feeling about you today:
            </p>
              <article className="data">
                BOSS NAME: {this.state.currentRatings.name}<br></br>
                BOSS SCORE: {this.state.currentRatings.score}<br></br>
                BOSS SPACE: {this.state.currentRatings.space}<br></br>
              </article>
              <Bosses
                getBossRatings={this.getBossRatings.bind(this)}
              />
        </div>

        <footer>
          IBM Hackathon 2017
        </footer>
      </div>
    );
  }
}

export default App;
