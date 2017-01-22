import React, { Component } from 'react';
import Bosses from './bosses';
import Penguin from './penguin';

class App extends Component {
  constructor(){
    super();

    this.state={
      name: '',
      score: .9,
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
    .then(r => {
      let data = r.json()
      console.log(data)
      this.setState({
        score: data.score,
        name: data.user,
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
          <Penguin score={this.state.score} />
        </div>
        <div style={{flex: 1}}>
          <div>
            <div className="donation-meter">
              <strong></strong>
              <span className="glass">
              <strong className="total" style={{bottom: "10%"}}>Pointy-Haired Boss</strong>
              <strong className="total" style={{bottom: "45%"}}>You're Alright</strong>
              <strong className="total" style={{bottom: "70%"}}>The Bomb</strong>
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
          The world's shortest and most honest performance review.
        </div>

      </div>
      </div>
    );
  }
}

export default App;
