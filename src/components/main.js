import React, { Component } from 'react';
import Bosses from './bosses';
import Penguin from './penguin';
import Chart_tone from './chart_tone';
import Chart_emotion from './chart_emotion';
import Chart_sentiment from './chart_sentiment';
import rd3 from 'react-d3';

class App extends Component {
  constructor(){
    super();

    let hash = window.location.hash.split('/')
    let user = hash[hash.length-1].toLowerCase()
    let space = hash[hash.length-2]

    this.state={
      name: user,
      user: user,
      loaded: false,
      donaldmode: user == 'donald',
      score: .5,
      space: space,
      data: {
        tones: [
          {tone: 'Agreeableness', value: ''},
          {tone: 'Conscientiousness', value: ''},
          {tone: 'Extraversion', value: ''},
          {tone: 'Emotional_range', value: ''},
          {tone: 'Openness', value: ''}
        ],
        emotions: [
          {emotion: 'Joy', value: ''},
          {emotion: 'Fear', value: ''},
          {emotion: 'Sadness', value: ''},
          {emotion: 'Disgust', value: ''}
        ],
        sentiments: [
          {sentiment: 'Analytical', value: ''},
          {sentiment: 'Confident', value: ''},
          {sentiment: 'Tentative', value: ''},
        ]
      },
      currentRatings: {
        score: '',
        name: '',
        space: ''
    }
  }
}

  componentDidMount() {
    fetch(`http://bossmeter.herokuapp.com/api/${this.state.space}/${this.state.user}`)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      let name = this.state.name || data.user
      this.setState({
        name: name,
        loaded: true,
        score: data.score,
        scorePercent: data.score*100 + "%"
      })
    })
  }

  render() {
    return (
      <div>
      <h1 style={{align: 'center', em: 2,}}>MOODMETER {this.state.name ? ':' + this.state.name : ''}</h1>
      <div className="App row" style={{display: 'flex', flexDirection: 'row', marginTop: "40px"}}>

        <div style={{flex: 2}}>
          <Penguin score={this.state.score} donald={this.state.donaldmode} />
        </div>
        <div>
          <Chart_tone data={this.state.data} />
          <Chart_emotion data={this.state.data} />
          <Chart_sentiment data={this.state.data} />
        </div>
        <div style={{flex: 1}}>
          <div>
            <div className="donation-meter">
              <strong></strong>
              <span className="glass">
              <strong className="total" style={{bottom: "0%"}}>Unfortunate.</strong>
              <strong className="total" style={{bottom: "45%"}}>You're Alright.</strong>
              <strong className="total" style={{bottom: "90%"}}>The Bomb!</strong>
              <span className="amount" style={{height: this.state.score*100 + "%"}}></span>
              </span>
              <div className="bulb">
                <span className="red-circle"></span>
                  <span className="filler">
                  <span></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{flex: 2}}>
          <p style={{fontSize: 24}}>
            The world's shortest and most honest performance review.
          </p>
          <p style={{fontSize: 24}}>
            Forget surveys. How do you come across in your day-to-day work?
          </p>
        </div>

      </div>
      </div>
    );
  }
}

export default App;
