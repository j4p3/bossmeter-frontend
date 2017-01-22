import React, { Component } from 'react';
import Bosses from './bosses';
import Penguin from './penguin';

class App extends Component {
  constructor(){
    super();

    let user = window.location.hash.split('/')
    user = user[user.length-1].toLowerCase()

    this.state={
      name: user,
      donaldmode: user == 'donald',
      score: .7,
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

  componentDidMount() {
    fetch(`http://bossmeter.herokuapp.com/api/space/person`)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      let name = this.state.name || data.user
      this.setState({
        name: name,
        score: data.score,
        scorePercent: data.score*100 + "%"
      })
    })
  }

  render() {
    return (
      <div>
      <h1 style={{align: 'center', em: 2,}}>BOSSMETER: {this.state.name}</h1>
      <div className="App row" style={{display: 'flex', flexDirection: 'row', marginTop: "40px"}}>

        <div style={{flex: 3}}>
          <Penguin score={this.state.score} donald={this.state.donaldmode} />
        </div>
        <div style={{flex: 1}}>
          <div>
            <div className="donation-meter">
              <strong></strong>
              <span className="glass">
              <strong className="total" style={{bottom: "10%"}}>Unfortunate.</strong>
              <strong className="total" style={{bottom: "45%"}}>You're Alright.</strong>
              <strong className="total" style={{bottom: "70%"}}>The Bomb!</strong>
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
            Forget surveys. How do your minions feel about you in their day-to-day work?
          </p>
        </div>

      </div>
      </div>
    );
  }
}

export default App;
